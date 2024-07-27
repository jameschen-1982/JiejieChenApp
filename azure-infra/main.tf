provider "azurerm" {
  features {}
}

resource "azurerm_service_plan" "react_demo_asp" {
  name                = "${local.stack_prefix}"
  location            = var.location
  resource_group_name = var.resource_group_name
  os_type             = "Linux"
  sku_name            = var.app_service_plan_sku
}

resource "azurerm_linux_web_app" "spa" {
  name                = "${local.stack_prefix}-spa"
  location            = var.location
  resource_group_name = var.resource_group_name
  service_plan_id     = azurerm_service_plan.react_demo_asp.id

  site_config {
    application_stack {
      node_version = "18-lts"
    }
    
    app_command_line = "pm2 start /home/site/wwwroot/ecosystem.config.js --no-daemon"
  }

  app_settings = {
    "SOME_KEY" = "some_value"
  }
}

resource "azurerm_app_service_custom_hostname_binding" "spa" {
  resource_group_name = var.resource_group_name
  hostname            = var.spa_public_domain_name
  app_service_name    = azurerm_linux_web_app.spa.name
}

resource "azurerm_linux_web_app" "web_api" {
  name                = "${local.stack_prefix}-web-api"
  location            = var.location
  resource_group_name = var.resource_group_name
  service_plan_id     = azurerm_service_plan.react_demo_asp.id

  site_config {
    application_stack {
      dotnet_version = "8.0"
    }
  }

  app_settings = {
    "ANOTHER_KEY" = "another_value"
  }
}

resource "azurerm_app_service_custom_hostname_binding" "web_api" {
  resource_group_name = var.resource_group_name
  hostname            = var.web_api_public_domain_name
  app_service_name    = azurerm_linux_web_app.web_api.name
}

resource "azurerm_mssql_server" "db_server" {
  name                         = "${local.stack_prefix}-db-server"
  resource_group_name          = var.resource_group_name
  location                     = var.location
  version                      = "12.0"
  administrator_login          = "sqladmin"
  administrator_login_password = "Password1234!"

  tags = {
    environment = var.environment
  }
}

resource "azurerm_mssql_database" "db" {
  name        = "${local.stack_prefix}-db"
  server_id   = azurerm_mssql_server.db_server.id
  collation   = "SQL_Latin1_General_CP1_CI_AS"
  max_size_gb = 5
  sku_name    = var.sql_server_sku
}
