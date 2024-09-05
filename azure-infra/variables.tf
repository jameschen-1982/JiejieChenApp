variable "location" {
  description = "The Azure Region to deploy resources."
  default     = "Australia East"
}

variable "environment" {
  description = "The environment name."
  default     = "dev"
}

variable "resource_group_name" {
  description = "The name of the resource group."
  default     = "james-chen-rg"
}

variable "app_service_plan_sku" {
  description = "The SKU of the App Service Plan."
  default     = "B3"
}

variable "sql_server_sku" {
  description = "The SKU of the SQL Server."
  default     = "S0"
}

variable "sql_server_admin_login" {
  description = "The admin login name for SQL Server."
  default     = "james.chen@standards.org.au"
}

variable "sql_server_admin_object_id" {
  description = "The Object ID for admin"
  default     = "c321ea73-f4af-417c-b94a-28effcc12323"
}

variable "spa_public_domain_name" {
  description = "The public domain name for the SPA."
  default     = "react-demo.jiejiechen.com"
}

variable "web_api_public_domain_name" {
  description = "The public domain name for the Web API."
  default     = "react-api.jiejiechen.com"
}
