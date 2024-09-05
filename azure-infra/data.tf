data "azurerm_client_config" "current" {}

data "azuread_service_principal" "web_managed_identity" {
  object_id = azurerm_linux_web_app.web_api.identity.0.principal_id
}