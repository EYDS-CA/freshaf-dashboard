# These should be manually populated in the console for each user

data "aws_ssm_parameter" "dynamo_db_password" {
  name = "/${var.project_code}/${var.target_env}/dynamodb/password"
}
