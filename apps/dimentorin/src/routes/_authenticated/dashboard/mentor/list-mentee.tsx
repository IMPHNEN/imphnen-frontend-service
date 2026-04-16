import { createFileRoute } from '@tanstack/react-router'
import { Card, Button, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Checkbox } from '@imphnen-frontend-service/ui/atoms'

/**
 * Mentee list page route.
 * Displays mentor mentees table, approval action, and pagination controls.
 */
export const Route = createFileRoute('/_authenticated/dashboard/mentor/list-mentee')({
  component: ListMenteePage,
})

type MenteeRow = {
  id: number
  checked: boolean
  name: string
  status: 'Done' | 'On Progress'
  mentoringSession: string
}

const menteeRows: MenteeRow[] = [
  {
    id: 1,
    checked: true,
    name: 'Ahmad Wildan',
    status: 'Done',
    mentoringSession: 'Senin, 22 Maret 2025 17:00 - 17:45 WIB',
  },
  {
    id: 2,
    checked: false,
    name: 'Firdaus Rangga Sasana',
    status: 'On Progress',
    mentoringSession: 'Rabu, 24 Maret 2025 19:00 - 19:45 WIB',
  },
]

/**
 * List mentee page.
 * @returns JSX element for mentor list mentee route content.
 */
export function ListMenteePage() {
  const selectedId = 2

  return (
    <section className="w-[972px]">
      <Card className="p-6">
        <div className="overflow-hidden rounded-sm border border-border-light">
          <Table>
            <TableHeader className="bg-primary-50">
              <TableRow>
                <TableHead className="w-11">
                  <Checkbox />
                </TableHead>
                <TableHead className="text-xs font-semibold text-text-label">No.</TableHead>
                <TableHead className="text-xs font-semibold text-text-label">Nama Mentee</TableHead>
                <TableHead className="text-xs font-semibold text-text-label">Status</TableHead>
                <TableHead className="text-xs font-semibold text-text-label">Mentoring Session</TableHead>
                <TableHead className="text-xs font-semibold text-text-label">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menteeRows.map((row) => {
                const isSelected = row.id === selectedId;
                return (
                  <TableRow key={row.id} className={isSelected ? 'bg-[#eaf4ff]' : ''}>
                    <TableCell>
                      <Checkbox checked={row.checked} />
                    </TableCell>
                    <TableCell className="text-xs text-text-muted">{row.id}</TableCell>
                    <TableCell className="text-[15px] text-[#454545]">{row.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={row.status === 'Done' ? 'success' : 'warning'}
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[15px] text-[#454545]">{row.mentoringSession}</TableCell>
                    <TableCell>
                      <Button size="sm">
                        Lakukan Approval
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </section>
  )
}
