import { H3Event } from "h3";

export function sendApiErrorOnNull<T>(
  value: T,
  event: H3Event,
  code: number,
  message: string
): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    sendError(
      event,
      createError({
        statusCode: code,
        message: message,
        statusMessage: message,
        data: {
          message: message,
        },
      })
    );
  }
}

export function sendApiErrorOnFalseCondition(
  condition: boolean,
  event: H3Event,
  code: number,
  message: string
): asserts condition is true {
  if (!condition) {
    sendError(
      event,
      createError({
        statusCode: code,
        message: message,
        statusMessage: message,
        data: {
          message: message,
        },
      })
    );
  }
}

export function sendApiError(
  event: H3Event,
  code: number,
  message: string
): void {
  sendError(
    event,
    createError({
      statusCode: code,
      message: message,
      statusMessage: message,
      data: {
        message: message,
      },
    })
  );
}
