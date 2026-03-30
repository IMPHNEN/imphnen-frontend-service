export interface ShowProps {
  condition: boolean
  children: React.ReactNode
  fallback?: React.ReactNode | null
}

export function Show({ condition, children, fallback = null }: ShowProps) {
  return condition ? children : fallback
}
