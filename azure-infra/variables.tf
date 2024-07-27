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
  default     = "B1"
}

variable "sql_server_sku" {
  description = "The SKU of the SQL Server."
  default     = "S0"
}

variable "sql_server_admin_login" {
  description = "The admin login name for SQL Server."
  default     = "sqladmin"
}

variable "sql_server_admin_password" {
  description = "The admin password for SQL Server."
  default     = "Password1234!"
}
