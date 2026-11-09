export function validateFields<TData>(
  obj: Partial<TData>,
  validateFields: readonly string[]
): obj is Required<TData> {

  return validateFields.every((field) => {
    const value = obj[field as keyof TData];

    if (typeof value === 'string') {
      return value.trim().length > 0;
    }

    return value !== null && value !== undefined;
  });
}