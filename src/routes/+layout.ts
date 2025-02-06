// Supports weights 100-900
import "@fontsource-variable/inter";
// Supports weights 300-900
import "@fontsource-variable/rubik";

import "$lib/sound";

import { dev } from "$app/environment";
import { inject } from "@vercel/analytics";
inject({ mode: dev ? "development" : "production" });
