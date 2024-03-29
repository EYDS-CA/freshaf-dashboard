#!make
export PROJECT := $(or $(PROJECT),freshaf)
ENV_NAME ?= dev
NAMESPACE = $(PROJECT)-$(ENV_NAME)
APP_SRC_BUCKET = $(NAMESPACE)-app
export AWS_REGION ?= ca-central-1

TERRAFORM_DIR = terraform
export BOOTSTRAP_ENV=terraform/bootstrap

ifeq ($(ENV_NAME), dev)
DOMAIN=dev.af.freshworks.club
CLOUDFRONT_ID=EXVZ3ZKC7MOZG
endif

ifeq ($(ENV_NAME), prod)
DOMAIN=af.freshworks.club
CLOUDFRONT_ID=E1UH19M1TDKWZC
endif

define TFVARS_DATA
target_env = "$(ENV_NAME)"
project_code = "$(PROJECT)"
api_artifact = "build/api.zip"
app_sources = "build/app"
app_sources_bucket = "$(APP_SRC_BUCKET)"
domain = "$(DOMAIN)"
google_client_id = "$(GOOGLE_CLIENT_ID)"
google_secret = "$(GOOGLE_SECRET)"
endef
export TFVARS_DATA

define TF_BACKEND_CFG
region="$(AWS_REGION)"
bucket="$(NAMESPACE)-tf-state"
dynamodb_table="$(NAMESPACE)-tf-lock"
endef
export TF_BACKEND_CFG

####################################################################
## Terraform Config
####################################################################

print-env:
	@echo NAMESPACE=$(NAMESPACE)
	@echo
	@echo ./$(TERRAFORM_DIR)/.auto.tfvars:
	@echo "$$TFVARS_DATA"
	@echo
	@echo ./$(TERRAFORM_DIR)/backend.hcl:
	@echo "$$TF_BACKEND_CFG"

bootstrap:
	## Set-up a S3 bucket for storing terraform state.
	## Only needs to be run once per environment, globally.
	terraform -chdir=$(BOOTSTRAP_ENV) init -input=false -reconfigure \
		-backend-config='path=$(ENV_NAME).tfstate'
	terraform -chdir=$(BOOTSTRAP_ENV) apply -auto-approve -input=false \
		-var='namespace=$(NAMESPACE)'

write-config-tf:
	@echo "$$TFVARS_DATA" > $(TERRAFORM_DIR)/.auto.tfvars
	@echo "$$TF_BACKEND_CFG" > $(TERRAFORM_DIR)/backend.hcl

init-tf: write-config-tf
	# Initializing the terraform environment
	@terraform -chdir=$(TERRAFORM_DIR) init -input=false \
		-reconfigure \
		-backend-config=backend.hcl

plan: init-tf
	# Creating all AWS infrastructure.
	@terraform -chdir=$(TERRAFORM_DIR) plan

deploy-api: init-tf 
	# Creating all AWS infrastructure.
	@terraform -chdir=$(TERRAFORM_DIR) apply -auto-approve -input=false

deploy-app:
	aws s3 sync ./terraform/build/app s3://$(APP_SRC_BUCKET) --delete
	aws --region $(AWS_REGION) cloudfront create-invalidation --distribution-id $(CLOUDFRONT_ID) --paths "/*"

deploy: deploy-api deploy-app

## Application stack building
pre-build:
	mkdir -p ./terraform/build

build-api: pre-build
	rm -r ./api/node_modules ./api/yarn.lock ./api/build ./terraform/build/api.zip || true
	SHARP_IGNORE_GLOBAL_LIBVIPS=1 yarn --cwd ./api --production
	mkdir -p ./api/build/node_modules
	mv ./api/node_modules ./api/build
	SHARP_IGNORE_GLOBAL_LIBVIPS=1 yarn --cwd ./api
	yarn --cwd ./api run build
	mv ./api/dist/* ./api/build
	cd ./api/build && zip -rq ../../terraform/build/api.zip *

build-app: pre-build
	rm -r ./terraform/build/app || true
	yarn --cwd ./app
	yarn --cwd ./app run build
	mv ./app/build ./terraform/build/app

build-all: build-api build-app

build-and-deploy: build-all deploy


####################################################################
## Local development
####################################################################

run-local:
	@echo "+\n++ Make: Running locally ...\n+"
	@docker-compose -f docker-compose.dev.yml up

run-local-app:
	@echo "+\n++ Make: Running client locally ...\n+"
	@docker-compose -f docker-compose.dev.yml up freshaf-app

run-local-api:
	@echo "+\n++ Make: Running api locally ...\n+"
	@docker-compose -f docker-compose.dev.yml up freshaf-api

close-local:
	@echo "+\n++ Make Closing local containers"
	@docker-compose -f docker-compose.dev.yml down

local-app-exec:
	@docker exec -it freshaf-app sh

local-api-exec:
	@docker exec -it freshaf-api sh

local-db-migrate:
	@docker exec -it freshaf-api npm run db:migrate
	