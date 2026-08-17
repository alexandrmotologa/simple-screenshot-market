import React from "react";

export const APP_STORE_LABEL = "App Store (iOS)";
export const GOOGLE_PLAY_LABEL = "Google Play (Android)";

/** Official Apple vector logo */
export function AppleStoreIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.61 1.34-.56.65-1.05 1.71-.92 2.74 1 .08 2.03-.51 2.61-1.23z" />
    </svg>
  );
}

/** Official Google Play colored vector logo */
export function GooglePlayIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path fill="#4285F4" d="M3.6 1.8c-.3.3-.5.8-.5 1.4v17.6c0 .6.2 1.1.5 1.4l9.2-9.2L3.6 1.8z" />
      <path fill="#FBBC04" d="M16.1 9.7l-3.3 3.3 3.3 3.3 3.8-2.2c1.1-.6 1.1-1.6 0-2.2l-3.8-2.2z" />
      <path fill="#EA4335" d="M12.8 13l-9.2 9.2c.4.4 1 .4 1.6.1l10.9-6.3-3.3-3z" />
      <path fill="#34A853" d="M5.2 2.7c-.6-.3-1.2-.3-1.6.1L12.8 12l3.3-3-10.9-6.3z" />
    </svg>
  );
}
