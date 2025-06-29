export interface ForProps<T, U> {
  data: readonly T[]
  children: (item: T, index: number) => U | null
  fallback?: React.ReactNode | null
}

/**
 * A functional component that renders a list of children components from a given
 * array of data.
 *
 * @param data - The array of data to render
 * @param children - A function that takes the current item and index and returns
 *                   the child component to render
 * @param fallback - An optional fallback component to render when the data is empty
 *
 * @returns An array of rendered child components if the data is not empty, otherwise
 *          the fallback component if it is provided, null otherwise
 */
export function For<T, U extends React.JSX.Element>({
  data,
  children,
  fallback = null
}: ForProps<T, U>): (U | null)[] | React.ReactNode | null {
  if (!Array.isArray(data) || !data?.length) return fallback

  return data.map((item, idx) => children(item, idx))
}
