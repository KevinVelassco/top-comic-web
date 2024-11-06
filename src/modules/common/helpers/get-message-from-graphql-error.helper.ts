export const getMessageFromGraphqlError = (error: any) => {
  let message = 'something went wrong...';

  if (error?.message) return error.message;

  if (!error['errors']) {
    return message;
  }

  const { errors } = error['response'];

  if (!errors) {
    return message;
  }

  if (!Array.isArray(errors)) {
    return message;
  }

  if (errors.length === 0) {
    return message;
  }

  const { message: errorMessage } = errors[0];

  if (!errorMessage) {
    return message;
  }

  message = errorMessage;

  return message;
};
