import { createFileRoute } from '@tanstack/react-router'
import { Icon } from '@iconify/react'
import { Badge, Button, Card, Input } from '@imphnen-frontend-service/ui/atoms'

/**
 * Feedback page route.
 * Shows mentor feedback filters and two-column feedback feed cards.
 */
export const Route = createFileRoute('/_authenticated/dashboard/mentor/feedback')({
  component: FeedbackPage,
})

type FeedbackItem = {
  id: number
  date: string
  rating: string
  username: string
  summary: string
}

type RatingFilter = {
  id: string
  label: string
  showStar: boolean
  active: boolean
}

const ratingFilters: RatingFilter[] = [
  { id: 'all', label: 'Tampilkan Semua', showStar: false, active: true },
  { id: 'five', label: '5 Bintang', showStar: true, active: false },
  { id: 'four', label: '4 Bintang', showStar: true, active: false },
  { id: 'three', label: '3 Bintang', showStar: true, active: false },
  { id: 'two', label: '2 Bintang', showStar: true, active: false },
  { id: 'one', label: '1 Bintang', showStar: true, active: false },
]

const feedbackItems: FeedbackItem[] = [
  {
    id: 1,
    date: '21 Mei 2025',
    rating: '5.0',
    username: 'Username',
    summary: 'Mentornya menjelaskan dengan sabar dan sangat detail. Aku jadi paham konsep yang tadinya bingung...',
  },
  {
    id: 2,
    date: '21 Mei 2025',
    rating: '5.0',
    username: 'Username',
    summary: 'Mentornya menjelaskan dengan sabar dan sangat detail. Aku jadi paham konsep yang tadinya bingung...',
  },
  {
    id: 3,
    date: '21 Mei 2025',
    rating: '5.0',
    username: 'Username',
    summary: 'Mentornya menjelaskan dengan sabar dan sangat detail. Aku jadi paham konsep yang tadinya bingung...',
  },
  {
    id: 4,
    date: '21 Mei 2025',
    rating: '5.0',
    username: 'Username',
    summary: 'Mentornya menjelaskan dengan sabar dan sangat detail. Aku jadi paham konsep yang tadinya bingung...',
  },
  {
    id: 5,
    date: '21 Mei 2025',
    rating: '5.0',
    username: 'Username',
    summary: 'Mentornya menjelaskan dengan sabar dan sangat detail. Aku jadi paham konsep yang tadinya bingung...',
  },
  {
    id: 6,
    date: '21 Mei 2025',
    rating: '5.0',
    username: 'Username',
    summary: 'Mentornya menjelaskan dengan sabar dan sangat detail. Aku jadi paham konsep yang tadinya bingung...',
  },
  {
    id: 7,
    date: '21 Mei 2025',
    rating: '5.0',
    username: 'Username',
    summary: 'Mentornya menjelaskan dengan sabar dan sangat detail. Aku jadi paham konsep yang tadinya bingung...',
  },
  {
    id: 8,
    date: '21 Mei 2025',
    rating: '5.0',
    username: 'Username',
    summary: 'Mentornya menjelaskan dengan sabar dan sangat detail. Aku jadi paham konsep yang tadinya bingung...',
  },
  {
    id: 9,
    date: '21 Mei 2025',
    rating: '5.0',
    username: 'Username',
    summary: 'Mentornya menjelaskan dengan sabar dan sangat detail. Aku jadi paham konsep yang tadinya bingung...',
  },
  {
    id: 10,
    date: '21 Mei 2025',
    rating: '5.0',
    username: 'Username',
    summary: 'Mentornya menjelaskan dengan sabar dan sangat detail. Aku jadi paham konsep yang tadinya bingung...',
  },
]

/**
 * Feedback page.
 * @returns JSX element for mentor feedback route content.
 */
export function FeedbackPage() {
  return (
    <section className="w-243 space-y-5">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[232px_1fr] lg:items-end">
        <div className="space-y-2">
          <p className="text-[23px] font-semibold leading-none text-text-label">Waktu Mentoring</p>
          <div className="relative">
            <Input type="text" size="sm" value="22 Maret 2025" readOnly className="pr-10" />
            <Icon icon="mdi:calendar-blank-outline" width="18" className="text-text-muted absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[23px] font-semibold leading-none text-text-label">Cari Berdasarkan Rating</p>
          <div className="flex flex-wrap gap-2">
            {ratingFilters.map((filter) => (
              <Button
                key={filter.id}
                size="sm"
                variant={filter.active ? 'primary' : 'secondary'}
              >
                {filter.showStar && <Icon icon="mdi:star" width="15" className="text-[#f7b135]" />}
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {feedbackItems.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">
                  <Icon icon="mdi:calendar-month-outline" width="15" className="text-text-muted" />
                  {item.date}
                </Badge>

                <Badge variant="warning">
                  <Icon icon="mdi:star" width="15" className="text-[#f7b135]" />
                  {item.rating}
                </Badge>

                <Badge variant="outline">
                  <Icon icon="mdi:account-circle-outline" width="15" className="text-text-muted" />
                  {item.username}
                </Badge>
              </div>

              <p className="mt-4 text-[15px] leading-[1.35] text-text-label">"{item.summary}"</p>
            </Card>
          ))}
      </div>
    </section>
  )
}
