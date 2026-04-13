import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'sonner'

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

  const updateBlock = (id: string, content: string) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, content } : b)))
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
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate({ to: '/dashboard/learning-path' })}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary-accent transition-colors cursor-pointer"
          >
            <Icon icon="mdi:arrow-left" width="24" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Article Builder</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors cursor-pointer"
          >
            Submit Article
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[600px] mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukkan Judul Artikel..."
          className="w-full text-4xl font-bold text-gray-900 border-none outline-none mb-8 placeholder:text-gray-300"
        />

        <div className="space-y-6">
          {blocks.map((block) => (
            <div key={block.id} className="group relative">
              <div className="absolute -left-12 top-0 bottom-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => removeBlock(block.id)}
                  className="p-2 text-gray-400 hover:text-red-500 cursor-pointer"
                >
                  <Icon icon="mdi:trash-can-outline" width="20" />
                </button>
              </div>

              {block.type === 'heading' && (
                <textarea
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, e.target.value)}
                  className="w-full text-2xl font-semibold text-gray-800 border-none outline-none resize-none overflow-hidden"
                  rows={1}
                />
              )}

              {block.type === 'paragraph' && (
                <textarea
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, e.target.value)}
                  className="w-full text-lg text-gray-600 border-none outline-none resize-none overflow-hidden leading-relaxed"
                  rows={3}
                />
              )}

              {block.type === 'image' && (
                <div className="w-full aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center hover:border-primary-500 transition-colors cursor-pointer group/img">
                  <Icon icon="mdi:image-plus" width="48" className="text-gray-300 group-hover/img:text-primary-500 mb-2" />
                  <p className="text-sm text-gray-500 group-hover/img:text-primary-500 font-medium">Click to upload image</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Toolbar to add blocks */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-center gap-4">
          <button
            onClick={() => addBlock('heading')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-pointer font-medium"
          >
            <Icon icon="mdi:format-header-1" width="20" />
            Heading
          </button>
          <button
            onClick={() => addBlock('paragraph')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-pointer font-medium"
          >
            <Icon icon="mdi:format-paragraph" width="20" />
            Paragraph
          </button>
          <button
            onClick={() => addBlock('image')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-pointer font-medium"
          >
            <Icon icon="mdi:image-outline" width="20" />
            Image
          </button>
        </div>
      </div>
    </div>
  )
}
