export interface ForProps<T, U> {
  data: readonly T[]
  children: (item: T, index: number) => U | null
  fallback?: React.ReactNode | null
}

export function For<T, U extends React.JSX.Element>({
  data,
  children,
  fallback = null
}: ForProps<T, U>): (U | null)[] | React.ReactNode | null {
  if (!Array.isArray(data) || !data?.length) return fallback

  return data.map((item, idx) => children(item, idx))
}
