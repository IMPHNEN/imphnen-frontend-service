import { createFileRoute } from '@tanstack/react-router'
import { SettingsContent } from './_components/settings-content'

export const Route = createFileRoute('/_authenticated/dashboard/user/settings/privacy')({
  component: SettingsPrivacyPage,
})

function SettingsPrivacyPage() {
  return <SettingsContent section="privacy" />
}
