import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'sonner'
import { Button } from '@imphnen-frontend-service/ui/atoms'

export const Route = createFileRoute('/_authenticated/dashboard/article-builder')({
  component: ArticleBuilderPage,
})

function ArticleBuilderPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [blocks, setBlocks] = useState<{ id: string; type: 'heading' | 'paragraph' | 'image'; content: string }[]>([
    { id: '1', type: 'heading', content: 'Judul Artikel Kamu' },
    { id: '2', type: 'paragraph', content: 'Mulai menulis konten artikel kamu di sini...' },
  ])

  const addBlock = (type: 'heading' | 'paragraph' | 'image') => {
    const newBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: type === 'image' ? '' : 'Klik untuk edit konten...',
    }
    setBlocks([...blocks, newBlock])
  }

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id))
  }

  const handleSave = () => {
    toast.success('Artikel berhasil disimpan sebagai draft!')
  }

  const handleSubmit = () => {
    toast.success('Artikel berhasil disubmit!')
    navigate({ to: '/dashboard/learning-path' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate({ to: '/dashboard/learning-path' })}
              className="text-primary-600 hover:text-primary-700 transition-colors font-medium flex items-center gap-1 cursor-pointer"
            >
              <Icon icon="mdi:arrow-left" width="20" />
              Kembali
            </button>
          </div>

          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-gray-900 mb-1">{title || 'Judul Artikel'}</h1>
            <p className="text-sm text-gray-500">Saved 27 April 2025 10:00 AM</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleSave}
              variant="text"
            >
              Save Draft
            </Button>
            <Button
              onClick={handleSubmit}
              variant="primary"
            >
              Submit →
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 min-h-[600px]">
          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full text-5xl font-bold text-gray-400 border-none outline-none mb-8 placeholder:text-gray-300"
          />

          {/* Content Blocks */}
          <div className="space-y-8">
            {blocks.map((block) => (
              <div key={block.id} className="group relative">
                {block.type === 'heading' && (
                  <h2 className="text-2xl font-semibold text-gray-800">{block.content}</h2>
                )}

                {block.type === 'paragraph' && (
                  <p className="text-lg text-gray-600 leading-relaxed">{block.content}</p>
                )}

                {block.type === 'image' && (
                  <div
                    className="w-full aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center hover:border-primary-500 transition-colors cursor-pointer group/img"
                    onClick={() => addBlock('image')}
                  >
                    <Icon icon="mdi:image-plus" width="48" className="text-gray-300 group-hover/img:text-primary-500 mb-2" />
                    <p className="text-sm text-gray-500 group-hover/img:text-primary-500 font-medium">Click to upload image</p>
                  </div>
                )}

                <button
                  onClick={() => removeBlock(block.id)}
                  className="absolute -right-8 top-0 p-2 text-gray-400 hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Icon icon="mdi:trash-can-outline" width="20" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Content Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex items-center gap-3">
            <button
              onClick={() => addBlock('paragraph')}
              className="flex items-center justify-center w-8 h-8 rounded-full text-primary-600 hover:bg-primary-50 transition-colors cursor-pointer"
            >
              <Icon icon="mdi:plus" width="24" />
            </button>
            <span className="text-gray-400 text-lg">|</span>
          </div>
        </div>
      </div>
    </div>
  )
}
