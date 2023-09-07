import { AUTH_STORAGE_KEY, AUTH_USER_KEY } from "./auth.constant";

export function authGetStorage(): any {
    const sessionStorage = localStorage.getItem(AUTH_STORAGE_KEY)

    if (!sessionStorage) return null

    return sessionStorage
}

export function authGetUser(): any {
    const userStorage = localStorage.getItem(AUTH_USER_KEY)

    if (!userStorage) return null

    return JSON.parse(userStorage)
}

export function authSetStorage(token: string): any {
    localStorage.setItem(AUTH_STORAGE_KEY, token)
}

export function authSetUser(user: any): any {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
}