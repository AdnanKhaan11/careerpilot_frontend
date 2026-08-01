export function getApiError(error) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}
