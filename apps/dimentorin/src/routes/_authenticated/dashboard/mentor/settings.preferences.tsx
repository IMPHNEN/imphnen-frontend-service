import { createFileRoute } from '@tanstack/react-router'
import { MentorSettingsContent } from './_components/settings-content'

export const Route = createFileRoute('/_authenticated/dashboard/mentor/settings/preferences')({
  component: MentorSettingsPreferencesPage,
})

function MentorSettingsPreferencesPage() {
  return <MentorSettingsContent section="preferences" />
}
