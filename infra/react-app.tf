# # resource "aws_s3_object" "jiejiechen_react_artifact" {
# #   bucket = aws_s3_bucket.lambda_bucket.id
# #   key    = "jiejiechen-react.zip"
# #   source = "${path.module}/../package/jiejiechen-react.zip"
# #   etag   = filesha256("${path.module}/../package/jiejiechen-react.zip")
# # }
# # 
# resource "aws_lambda_function" "jiejiechen_react" {
#   function_name = "${local.stack_prefix}-react"
#   s3_bucket = aws_s3_bucket.lambda_bucket.id
#   s3_key    = aws_s3_object.jiejiechen_angular_artifact.key
#   runtime     = "nodejs20.x"
#   handler     = "not-used"
#   role         = aws_iam_role.handler_lambda_exec.arn
#   timeout      = 30 # seconds
#   memory_size  = 512
#   source_code_hash = filesha256("../package/jiejiechen-angular.zip")
# }
# # 
# # resource "aws_cloudwatch_log_group" "jiejiechen_react" {
# #   name = "/aws/lambda/${aws_lambda_function.jiejiechen_react.function_name}"
# # }
