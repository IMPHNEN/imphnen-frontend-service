import { createFileRoute } from '@tanstack/react-router'
import { MentorSettingsContent } from './_components/settings-content'

export const Route = createFileRoute('/_authenticated/dashboard/mentor/settings/faq')({
  component: MentorSettingsFaqPage,
})

function MentorSettingsFaqPage() {
  return <MentorSettingsContent section="faq" />
}
