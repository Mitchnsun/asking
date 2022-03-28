/* eslint-disable @typescript-eslint/no-explicit-any */

const local = {
  get: (key: string): any | null => {
    try {
      const value = localStorage?.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (e) {
      console.info('Error get key from local storage', e)
      return null
    }
  },
  set: (key: string, value: unknown): void => {
    try {
      localStorage?.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.info('Error set key to local storage', e)
    }
  },
  remove: (key: string): void => {
    try {
      localStorage?.removeItem(key)
    } catch (e) {
      console.info('Error removing key from local storage', e)
    }
  },
}

const session = {
  get: (key: string): any | null => {
    try {
      const value = sessionStorage?.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (e) {
      console.info('Error get key from session storage', e)
      return null
    }
  },
  set: (key: string, value: string): void => {
    try {
      sessionStorage?.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.info('Error set key to session storage', e)
    }
  },
  remove: (key: string): void => {
    try {
      sessionStorage?.removeItem(key)
    } catch (e) {
      console.info('Error removing key from session storage', e)
    }
  },
}

const Storage = { local, session }

export default Storage
