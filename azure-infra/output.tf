output "react_demo_spa_url" {
  value = azurerm_linux_web_app.spa.default_hostname
}

output "react_demo_web_api_url" {
  value = azurerm_linux_web_app.web_api.default_hostname
}

output "sql_server_name" {
  value = azurerm_mssql_server.db_server.name
}

output "sql_database_name" {
  value = azurerm_mssql_server.db_server.name
}
