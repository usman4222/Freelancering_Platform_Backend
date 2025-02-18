export function ApiResponse(success, message, data) {
  return {
    success,
    message,
    data,
  };
}
