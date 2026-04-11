import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms'
import { useCreateTestimonial } from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_authenticated/cms-testimonials_/create')({
  component: CmsTestimonialsCreatePage,
})

function CmsTestimonialsCreatePage() {
  const navigate = useNavigate()
  const createTestimonial = useCreateTestimonial()

  const form = useForm<{ role: string; content: string }>({
    mode: 'all',
    defaultValues: { role: '', content: '' },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createTestimonial.mutateAsync(data)
      toast.success('Data testimonial berhasil ditambahkan')
      navigate({ to: '/cms-testimonials' })
    } catch (error) {
      console.log(error)
      toast.error('Data testimonial gagal ditambahkan')
    }
  })

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
          <h1 className="text-2xl font-bold text-gray-900">Tambah Testimonial</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <ControlledInputField
              control={form.control}
              label="Role"
              name="role"
              type="text"
              placeholder="Masukkan Role (e.g. Software Engineer)"
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
                Tambah Testimonial
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
