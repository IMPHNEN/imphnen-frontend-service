import { createFileRoute } from '@tanstack/react-router'
import { MentorSettingsContent } from './_components/settings-content'

export const Route = createFileRoute('/_authenticated/dashboard/mentor/settings/privacy')({
  component: MentorSettingsPrivacyPage,
})

function MentorSettingsPrivacyPage() {
  return <MentorSettingsContent section="privacy" />
}
