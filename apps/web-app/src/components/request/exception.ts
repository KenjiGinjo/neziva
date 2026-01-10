class CancelException extends Error {
  public constructor(message: string) {
    super(message)
  }
}

export const RequestException = {
  Cancel: CancelException,
}
