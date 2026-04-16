import { createFileRoute } from '@tanstack/react-router'
import { SettingsContent } from './_components/settings-content'

export const Route = createFileRoute('/_authenticated/dashboard/user/settings/faq')({
  component: SettingsFaqPage,
})

function SettingsFaqPage() {
  return <SettingsContent section="faq" />
}
