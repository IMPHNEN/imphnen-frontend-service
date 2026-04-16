import { createFileRoute } from '@tanstack/react-router'
import { SettingsContent } from './_components/settings-content'

export const Route = createFileRoute('/_authenticated/dashboard/user/settings/preferences')({
  component: SettingsPreferencesPage,
})

function SettingsPreferencesPage() {
  return <SettingsContent section="preferences" />
}
