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

provider "aws" {
  alias  = "backup-website-region"
  region = var.backup-website-bucket-region
}

provider "aws" {
  alias  = "cloudfront-certificate"
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket = "c2j"
    key    = "terraform-states/www.jiejiechen.com-prod/terraform.tfstate"
    region = "ap-southeast-2"
  }
}