import { createFileRoute } from '@tanstack/react-router'
import { SettingsContent } from './_components/settings-content'

export const Route = createFileRoute('/_authenticated/dashboard/user/settings/feedback')({
  component: SettingsFeedbackPage,
})

function SettingsFeedbackPage() {
  return <SettingsContent section="feedback" />
}
