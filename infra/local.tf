data "aws_caller_identity" "current" {}

locals {
  account_id        = data.aws_caller_identity.current.account_id
  stack_prefix = "cjj-${var.env}-${random_string.rnd.id}"
}