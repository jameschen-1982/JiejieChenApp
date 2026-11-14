'use client'

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { usePostHog } from 'posthog-js/react';

export default function PostHogPageView() : null {
  const pathname = usePathname();
  const posthog = usePostHog();
  useEffect(() => {
    // Track pageviews
    if (pathname && posthog) {
      // Never send OIDC callback codes, state, or other query secrets to analytics.
      const url = window.origin + pathname
      posthog.capture(
        '$pageview',
        {
          '$current_url': url,
        }
      )
    }
  }, [pathname, posthog])

  return null
}
