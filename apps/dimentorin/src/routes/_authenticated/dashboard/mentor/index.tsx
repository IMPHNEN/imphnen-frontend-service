import { createFileRoute } from '@tanstack/react-router'
import { MentorDashboard } from './_components/mentor-dashboard'

export const Route = createFileRoute('/_authenticated/dashboard/mentor/')({
  component: MentorDashboard,
})
