import { createFileRoute } from '@tanstack/react-router'
import { ReactElement } from 'react'
import { Contribute } from './resources_/_components/contribute'
import { WorkWithUs } from './resources_/_components/work-with-us'
import { Collaborate } from './resources_/_components/collaborate'

export const Route = createFileRoute('/_site/resources')({
  component: ResourcesPage,
})

function ResourcesPage(): ReactElement {
  return (
    <main>
      <Contribute />
      <WorkWithUs />
      <Collaborate />
    </main>
  )
}
