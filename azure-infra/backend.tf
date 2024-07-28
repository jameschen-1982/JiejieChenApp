terraform {
  backend "azurerm" {
    resource_group_name  = "james-chen-rg"
    storage_account_name = "jameschenstorage"
    container_name       = "react-demo"
    key                  = "react-demo/terraform.tfstate"
  }
  
  required_providers {
    mssql = {
      source = "betr-io/mssql"
      version = "0.3.1"
    }
  }
}