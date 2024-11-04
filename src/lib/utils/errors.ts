import * as Sentry from "@sentry/browser"

export const captureError = (exception: unknown) => {
    Sentry.captureException(exception)
}