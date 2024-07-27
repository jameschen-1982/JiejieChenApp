'use client'

import React from "react";
import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  authority: process.env.NEXT_PUBLIC_IDP_AUTHORITY,
  client_id: process.env.NEXT_PUBLIC_IDP_CLIENT_ID,
  redirect_uri: process.env.NEXT_PUBLIC_SPA_HOST,
  scope: "openid profile email"
};

export default function Auth0AuthProvider({children}: {children: React.ReactNode}) {
  return (
    <AuthProvider {...oidcConfig}>
      {children}
    </AuthProvider>
  )
}
