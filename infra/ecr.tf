resource "aws_ecr_repository" "jiejiechen-cms" {
  name                 = "jiejiechen-cms"
  image_tag_mutability = "MUTABLE"
  encryption_configuration {
    encryption_type = "KMS"
  }
  image_scanning_configuration {
    scan_on_push = true
  }
  
}
