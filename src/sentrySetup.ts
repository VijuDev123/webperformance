import * as Sentry from "@sentry/react";
import settings from "./settings";

let sentryInitialized = false;

export const sentrySetup = () => {
  if (sentryInitialized) return; // <-- prevents multiple calls
  sentryInitialized = true;

  try {
    Sentry.init({
      dsn: settings.sentry.dsn,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
        Sentry.feedbackIntegration({ colorScheme: "system" }),
      ],
      tracesSampleRate: 1.0,
      tracePropagationTargets: [/^\//, /^https:\/\/yourserver\.io\/api/],
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  } catch (err) {
    console.error("Sentry init failed:", err);
  }
};
