import { useCallback, useEffect, useState } from 'react'

export function useAsync<Type>(func: () => Promise<any>, dependencies?: []) {
  const { execute, ...state } = useAsyncInternal<Type>(func, dependencies, true)
  useEffect(() => {
    execute()
  }, [execute])
  return state
}

export function useAsyncFn<Type>(func: () => Promise<any>, dependencies?: []) {
  return useAsyncInternal<Type>(func, dependencies, false)
}

export function useAsyncInternal<Type>(
  func: (...params: any) => Promise<any>,
  dependencies?: [],
  initialLoading = false
) {
  const [loading, setLoading] = useState(initialLoading)
  const [error, setError] = useState()
  const [value, setValue] = useState<Type>()

  const execute = useCallback((...params: any) => {
    setLoading(true)
    return func(...params)
      .then((data: any) => {
        setValue(data)
        setError(undefined)
        return data
      })
      .catch((error: any) => {
        setError(error)
        setValue(undefined)
        return Promise.reject(error)
      })
      .finally(() => {
        setLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies ?? [])

  return { loading, error, value, execute }
}
