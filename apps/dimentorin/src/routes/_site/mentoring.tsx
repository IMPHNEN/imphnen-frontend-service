import { createFileRoute } from '@tanstack/react-router'
import { FC, ReactElement, useRef, useState } from 'react'
import { BannerSection } from './mentoring_/_components/banner-section'
import { Topics } from './mentoring_/_components/topics'
import { Input } from '@imphnen-frontend-service/ui/atoms'
import { SearchOutlined } from '@ant-design/icons'
import { For } from '@imphnen-frontend-service/utils'
import { MentorCard } from './mentoring_/_components/mentor-card'
import { Pagination } from '@imphnen-frontend-service/ui/molecules'
import { getCoreRowModel, getPaginationRowModel, PaginationState, useReactTable } from '@tanstack/react-table'
import { motion, useInView, Variants } from 'framer-motion'
import { useMentorList } from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_site/mentoring')({
  component: MentoringPage,
})

function MentoringPage(): ReactElement {
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  })

  const { data: mentorData, isLoading } = useMentorList({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    search: search || undefined,
  })

  const mentors = mentorData?.data ?? []
  const totalItems = mentorData?.meta?.total ?? 0

  const table = useReactTable({
    data: mentors,
    columns: [],
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) => {
      setPagination(updater)
    },
    pageCount: Math.ceil(totalItems / pagination.pageSize) || 1,
    manualPagination: true,
  })

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <main>
      <BannerSection />

      <section className="w-full px-8 md:px-[60px] md:pb-[60px] lg:px-20">
        <motion.div
          className="max-w-7xl mx-auto bg-white rounded-lg py-6 md:rounded-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-10 md:px-6 lg:mb-[60px]">
            <motion.h1
              className="text-center text-[15px] text-primary-500 font-semibold mb-8 md:text-2xl md:mb-10 lg:text-3xl lg:mb-[60px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Choose Your Topics
            </motion.h1>

            <Topics />
          </div>

          <motion.div ref={ref} className="md:px-6">
            <motion.div
              className="relative mb-6 md:px-12 lg:px-0 lg:w-[480px] lg:mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Input
                placeholder="Cari berdasarkan nama, posisi/peran"
                className="relative min-w-full w-full"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPagination((p) => ({ ...p, pageIndex: 0 }))
                }}
              />
              <SearchOutlined className="absolute right-2.5 top-1/2 -translate-y-1/2 text-primary-500 size-2.5 cursor-text md:me-12 lg:me-0" />
            </motion.div>

            {isLoading ? (
              <div className="text-center py-12 text-neutral-400">Loading mentors...</div>
            ) : (
              <motion.div
                className="grid gap-2 mb-10 md:grid-cols-2 md:gap-6 lg:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <For data={mentors}>
                  {(mentor, index) => (
                    <motion.div key={mentor.id ?? index} variants={childVariants}>
                      <MentorCard mentor={mentor} />
                    </motion.div>
                  )}
                </For>
              </motion.div>
            )}

            <Pagination table={table} />
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
