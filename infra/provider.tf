provider "aws" {
  region = "ap-southeast-2"
  default_tags {
    tags = {
      "Owner"       = "JieJie Chen"
      "Environment" = "Production"
      "Application" = "Jiejie Chen"
    }
  }
}
terraform {
  backend "s3" {
    bucket = "c2j"
    key    = "terraform-states/www.jiejiechen.com-prod/terraform.tfstate"
    region = "ap-southeast-2"
  }
}