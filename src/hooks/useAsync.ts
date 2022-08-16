import { SetStateAction, useCallback, useEffect, useState } from 'react'
import { CommentServiceType } from '../types/PostContextType'

export function useAsync<Type>(
  func: (params: CommentServiceType) => Promise<any>,
  dependencies?: []
) {
  const { execute, ...state } = useAsyncInternal<Type>(func, dependencies, true)
  useEffect(() => {
    execute()
  }, [execute])
  return state
}

export function useAsyncFn<Type>(
  func: (params: CommentServiceType) => Promise<any>,
  dependencies?: []
) {
  return useAsyncInternal<Type>(func, dependencies, false)
}

export function useAsyncInternal<Type>(
  func: (params: CommentServiceType) => Promise<any>,
  dependencies?: [],
  initialLoading = false
) {
  const [loading, setLoading] = useState(initialLoading)
  const [error, setError] = useState()
  const [value, setValue] = useState<Type>()

  const execute = useCallback(async (params?: CommentServiceType) => {
    setLoading(true)
    try {
      try {
        const data = await func({ ...params })
        setValue(data)
        setError(undefined)
        return data
      } catch (error) {
        setError(error as SetStateAction<any>)
        setValue(undefined)
        return await Promise.reject(error)
      }
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies ?? [])

  return { loading, error, value, execute }
}
