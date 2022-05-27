import { useState, useCallback, useEffect } from 'react'

type UseFilterReturn<T> = [T[], (key: keyof T, term: string) => void]

export const useFilter = <T extends Record<string, unknown>>(
  records: T[]
): UseFilterReturn<T> => {
  const [filtered, setFiltered] = useState<T[]>(records)

  useEffect(() => {
    setFiltered(records)
  }, [records])

  const filter = useCallback(
    (key: keyof T, term: string) => {
      const matches = records.filter((record) => {
        const content = (record[key] || '') as string
        return content.toLowerCase().includes(term.toLowerCase())
      })
      setFiltered(matches)
    },
    [records]
  )

  return [filtered, filter]
}
