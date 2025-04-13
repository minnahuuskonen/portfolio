/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly EMAIL_TO: string;
  readonly RESEND_API_KEY: string;
  readonly TURNSTILE_SECRET_KEY: string;
  readonly TURNSTILE_SITE_VERIFY_ENDPOINT: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}