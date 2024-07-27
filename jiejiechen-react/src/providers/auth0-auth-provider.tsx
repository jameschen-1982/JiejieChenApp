'use client'

import React, { useEffect } from "react";
import {AuthProvider, useAuth} from "react-oidc-context";
import {WebStorageStateStore} from "oidc-client-ts";

const oidcConfig = {
  authority: process.env.NEXT_PUBLIC_IDP_AUTHORITY,
  client_id: process.env.NEXT_PUBLIC_IDP_CLIENT_ID,
  redirect_uri: process.env.NEXT_PUBLIC_SPA_HOST,
  scope: "openid profile email",
  extraQueryParams: { audience: process.env.NEXT_PUBLIC_IDP_AUDIENCE },
  userStore: new WebStorageStateStore({store: window?.localStorage}),
  onSigninCallback: (_user: unknown | void): void => {
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    )
  }
};

export default function Auth0AuthProvider({children}: { children: React.ReactNode }) {
  return (
    <AuthProvider {...oidcConfig}>
      {children}
    </AuthProvider>
  )
}
