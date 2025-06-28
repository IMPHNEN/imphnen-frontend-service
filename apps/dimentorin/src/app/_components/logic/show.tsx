export interface ShowProps {
  condition: boolean
  children: React.ReactNode
  fallback?: React.ReactNode | null
}

/**
 * Conditionally renders the `children` component if `condition` is true. If
 * `condition` is false, renders the `fallback` component instead.
 *
 * If `fallback` is `null`, renders nothing.
 *
 * @param condition - The condition to check
 * @param children - The component to render if `condition` is true
 * @param fallback - The component to render if `condition` is false
 */
export function Show({ condition, children, fallback = null }: ShowProps) {
  return condition ? children : fallback
}
