import { createFileRoute } from '@tanstack/react-router'
import { MentorSettingsContent } from './_components/settings-content'

export const Route = createFileRoute('/_authenticated/dashboard/mentor/settings/report')({
  component: MentorSettingsReportPage,
})

function MentorSettingsReportPage() {
  return <MentorSettingsContent section="report" />
}
