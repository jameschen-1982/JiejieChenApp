resource "aws_dynamodb_table" "lead_table" {
  name           = "${local.stack_prefix}-Lead"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "Email"
  range_key      = "TimeSubmitted"

  attribute {
    name = "Email"
    type = "S"
  }

  attribute {
    name = "TimeSubmitted"
    type = "S"
  }
}