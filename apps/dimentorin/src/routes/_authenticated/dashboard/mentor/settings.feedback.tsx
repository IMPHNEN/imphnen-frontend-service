import { createFileRoute } from '@tanstack/react-router'
import { MentorSettingsContent } from './_components/settings-content'

export const Route = createFileRoute('/_authenticated/dashboard/mentor/settings/feedback')({
  component: MentorSettingsFeedbackPage,
})

function MentorSettingsFeedbackPage() {
  return <MentorSettingsContent section="feedback" />
}
