import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms'
import {
  useTestimonialList,
  useUpdateTestimonial,
} from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_authenticated/cms-testimonials_/$id')({
  component: CmsTestimonialsEditPage,
})

function CmsTestimonialsEditPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const updateTestimonial = useUpdateTestimonial()

  const { data: testimonialsData, isLoading } = useTestimonialList({ search: '', per_page: 100 })
  const testimonial = testimonialsData?.data?.find((t) => t.id === id)

  const form = useForm<{ role: string; content: string }>({
    mode: 'all',
    defaultValues: { role: '', content: '' },
  })

  useEffect(() => {
    if (testimonial) {
      form.reset({
        role: testimonial.role,
        content: testimonial.content,
      })
    }
  }, [testimonial])

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await updateTestimonial.mutateAsync({ id, data })
      toast.success('Perubahan testimonial berhasil dilakukan')
      navigate({ to: '/cms-testimonials' })
    } catch (error) {
      console.log(error)
      toast.error('Perubahan testimonial gagal dilakukan')
    }
  })

  if (isLoading) {
    return (
      <main className="w-full px-[48px] py-[40px]">
        <div className="text-center py-8 text-neutral-400">Loading...</div>
      </main>
    )
  }

  return (
    <main className="w-full px-[48px] py-[40px] flex flex-col gap-8">
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate({ to: '/cms-testimonials' })}
            className="text-primary-500 hover:text-primary-600"
          >
            <ArrowLeftOutlined className="text-[20px]" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Testimonial</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <ControlledInputField
              control={form.control}
              label="Role"
              name="role"
              type="text"
              placeholder="Masukkan Role"
              size="lg"
              className="w-full"
            />
            <ControlledInputField
              control={form.control}
              label="Konten Testimonial"
              name="content"
              type="text"
              placeholder="Masukkan Konten Testimonial"
              size="lg"
              className="w-full"
            />

            <div className="flex gap-3 pt-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                type="submit"
              >
                Update Testimonial
              </Button>
              <Button
                variant="bordered"
                size="lg"
                className="w-full"
                onClick={() => navigate({ to: '/cms-testimonials' })}
              >
                Batal
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
