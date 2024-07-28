provider "azurerm" {
  features {}
}

# SPA Web App
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
  }

  identity {
    type = "SystemAssigned"
  }
}

resource "azurerm_app_service_custom_hostname_binding" "spa" {
  resource_group_name = var.resource_group_name
  hostname            = var.spa_public_domain_name
  app_service_name    = azurerm_linux_web_app.spa.name
}

# Web API App
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
    "AllowedOrigins" = "https://${var.spa_public_domain_name}",
    "ConnectionStrings__DefaultConnection" = "Server=tcp:react-demo-dev-db-server.database.windows.net,1433;Initial Catalog=react-demo-dev-db;Encrypt=True;TrustServerCertificate=False;Connection Timeout=15;Authentication=\"Active Directory Default\";"
  }

  identity {
    type = "SystemAssigned"
  }
}

resource "azurerm_app_service_custom_hostname_binding" "web_api" {
  resource_group_name = var.resource_group_name
  hostname            = var.web_api_public_domain_name
  app_service_name    = azurerm_linux_web_app.web_api.name
}

# Azure SQL Server
resource "azurerm_mssql_server" "db_server" {
  name                = "${local.stack_prefix}-db-server"
  resource_group_name = var.resource_group_name
  location            = var.location
  version             = "12.0"
  
  azuread_administrator {
    azuread_authentication_only = true
    login_username              = var.sql_server_admin_login
    object_id                   = var.sql_server_admin_object_id
  }

  tags = {
    environment = var.environment
  }
}

resource "azurerm_mssql_firewall_rule" "db_firewall" {
  name             = "${local.stack_prefix}-db-firewall"
  server_id        = azurerm_mssql_server.db_server.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

resource "azurerm_mssql_database" "db" {
  name        = "${local.stack_prefix}-db"
  server_id   = azurerm_mssql_server.db_server.id
  collation   = "SQL_Latin1_General_CP1_CI_AS"
  max_size_gb = 5
  sku_name    = var.sql_server_sku
}


resource "mssql_user" "webapi_db_user" {
  server {
    host = azurerm_mssql_server.db_server.fully_qualified_domain_name
    azuread_default_chain_auth {}
  }

  database  = azurerm_mssql_database.db.name
  username  = azurerm_linux_web_app.web_api.name
  object_id = data.azuread_service_principal.web_managed_identity.object_id

  roles     = ["db_datareader", "db_datawriter"]
}