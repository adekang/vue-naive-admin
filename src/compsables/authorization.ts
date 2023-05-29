export const STORAGE_AUTHORIZATION_KEY = 'Authorization'

export const useAuthorization = createGlobalState(() =>
  useStorage<null | string>(STORAGE_AUTHORIZATION_KEY, null)
)
