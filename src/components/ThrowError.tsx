function ThrowError() {
  throw new Error('Test error');

  // v8 ignore next
  return null;
}

export default ThrowError;
