export const STORAGE_AUTHORIZATION_KEY = 'Authorization'

export const useAuthorization = createGlobalState(() => useStorage(STORAGE_AUTHORIZATION_KEY, null))
