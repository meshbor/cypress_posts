import { objectHasProperty } from './commonUtils'

export const getMessageFromError = (error: unknown, defaultErrorMessage: string) => {
  if (
    objectHasProperty(error, 'data') &&
    objectHasProperty(error.data, 'message') &&
    typeof error.data.message === 'string'
  )
    return error.data.message

  return defaultErrorMessage
}
