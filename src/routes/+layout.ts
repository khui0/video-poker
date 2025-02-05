// Supports weights 100-900
import "@fontsource-variable/inter";
// Supports weights 300-900
import "@fontsource-variable/rubik";

import { dev } from "$app/environment";
import { inject } from "@vercel/analytics";
inject({ mode: dev ? "development" : "production" });

import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
injectSpeedInsights();
