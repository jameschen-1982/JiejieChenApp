import React, {useEffect, useState} from "react";
import {useAuth} from "react-oidc-context";

export default function LoginComponent({isMobile} : {isMobile: boolean}) {
  const auth = useAuth();
  const [buttonStyles, setButtonStyles] = useState<string>("");
  
  useEffect(() => {
    if (isMobile) {
      setButtonStyles("-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50");
    } else {
      setButtonStyles("text-sm font-semibold leading-6 text-gray-900");
    }
  }, [isMobile]);
  
  const handleLoginClick = async () => {
    await auth.signinRedirect();
  }
  
  const handleLogoutClick = async () => {
    await auth.signoutSilent({ id_token_hint: auth.user?.id_token });
    await auth.removeUser();
  }
  
  if (!auth.isAuthenticated) {
    return (
      <button
        onClick={handleLoginClick}
        className={buttonStyles}
      >
        Log in
      </button>
    )
  } else {
    return (
      <button
        onClick={handleLogoutClick}
        className={buttonStyles}
      >
        Log Out
      </button>
    )
  }
}
