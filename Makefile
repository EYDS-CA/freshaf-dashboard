#!make
export PROJECT := $(or $(PROJECT),freshaf)
ENV_NAME ?= dev
NAMESPACE = $(PROJECT)-$(ENV_NAME)
DOMAIN ?= dev.af.freshworks.club
APP_SRC_BUCKET = $(NAMESPACE)-app
export AWS_REGION ?= ca-central-1

TERRAFORM_DIR = terraform
export BOOTSTRAP_ENV=terraform/bootstrap


ifeq ($(ENV_NAME), dev)
DOMAIN=dev.af.freshworks.club
endif

ifeq ($(ENV_NAME), prod)
DOMAIN=af.freshworks.club
endif

define TFVARS_DATA
target_env = "$(ENV_NAME)"
project_code = "$(PROJECT)"
api_artifact = "build/api.zip"
app_sources = "build/app"
app_sources_bucket = "$(APP_SRC_BUCKET)"
domain = "$(DOMAIN)"
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
	@echo AWS_SA_ROLE_ARN=$(AWS_SA_ROLE_ARN)
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

## Application stack building
pre-build:
	mkdir -p ./terraform/build

build-prod-app: pre-build
	rm -r ./terraform/build/app || true
	yarn --cwd ./app
	yarn --cwd ./app run export
	mv ./app/out ./terraform/build/app



