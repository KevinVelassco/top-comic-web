export const getMessageFromError = (error: any) => {
  let message = 'something went wrong...';

  if (!error['response']) return message;

  const { data } = error['response'];

  if (!data) return message;

  if (!data['message']) return message;

  const errorMessage = data.message;

  if (Array.isArray(errorMessage) && errorMessage.length === 0) {
    return message;
  }

  message = errorMessage;

  return message;
};
