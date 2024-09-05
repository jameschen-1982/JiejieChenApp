'use client'

import {useAuth} from "react-oidc-context";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {CustomOidcState} from "@/providers/auth0-auth-provider";

export default function Page() {
  const auth = useAuth();
  const router = useRouter();
  const [callbackTimeout, setCallbackTimeout] = useState<boolean>(false);
  setTimeout(() => {
    setCallbackTimeout(true);
  }, 5000);

  useEffect(() => {
    const state = auth.user?.state as CustomOidcState;
    if (state?.returnTo) {
      router.push(state.returnTo);
    }
  }, [auth]);
  
  useEffect(() => {
    if (callbackTimeout) {
      router.push('/');
    }
  }, [callbackTimeout]);

  return (<div className="h-screen flex items-center justify-center text-center">
    <div className="m-3">
      Redirecting...
    </div>
  </div>);
}
