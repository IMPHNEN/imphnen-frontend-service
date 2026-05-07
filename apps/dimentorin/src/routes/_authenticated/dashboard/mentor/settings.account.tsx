import { createFileRoute } from '@tanstack/react-router'
import { MentorSettingsContent } from './_components/settings-content'

export const Route = createFileRoute('/_authenticated/dashboard/mentor/settings/account')({
  component: MentorSettingsAccountPage,
})

function MentorSettingsAccountPage() {
  return <MentorSettingsContent section="account" />
}
