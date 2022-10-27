interface IError {
  code?: number
  httpStatus?: number
  message: string
  name: string
}
export default function generateError (code = 500, message: string): Error {
  const error: IError = new Error(message)
  error.name = 'error'
  error.httpStatus = code
  return error
}
