import { FC } from 'react'
import { Icon } from '@iconify/react'

interface ArticlePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  article: {
    judul: string
    materi: string
    status: string
    submitDate: string
  } | null
}

export const ArticlePreviewModal: FC<ArticlePreviewModalProps> = ({ isOpen, onClose, article }) => {
  if (!isOpen || !article) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer z-10"
        >
          <Icon icon="mdi:close" width="24" />
        </button>

        <div className="p-8 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm mb-2 uppercase tracking-wider">
            <Icon icon="mdi:book-open-page-variant" width="18" />
            Article Preview
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{article.judul}</h2>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Icon icon="mdi:calendar-clock" width="16" />
              {article.submitDate || 'Not submitted yet'}
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="mdi:tag-outline" width="16" />
              {article.materi}
            </div>
            <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              article.status === 'Done' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {article.status}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-bold mb-4">Introduction</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <div className="my-8 aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden">
               <img src="/image/code-article.webp" alt="Article Cover" className="w-full h-full object-cover" />
            </div>

            <h3 className="text-xl font-bold mb-4">Key Concepts</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>First major point of discussion</li>
              <li>Second key takeaway for readers</li>
              <li>Important consideration for implementation</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 mt-8">Conclusion</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              In conclusion, following these steps will help you achieve the best results. Keep practicing and exploring more advanced topics to further your knowledge.
            </p>
          </div>
        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Close
          </button>
          {article.status !== 'Done' && (
            <button
              className="px-6 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors cursor-pointer"
            >
              Edit Article
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
