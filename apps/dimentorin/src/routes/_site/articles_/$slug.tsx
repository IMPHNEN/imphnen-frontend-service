import { createFileRoute } from '@tanstack/react-router'
import { Icon } from '@iconify/react'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { cn } from '@imphnen-frontend-service/utils'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/_site/articles_/$slug')({
  component: DetailArticlePage,
})

function DetailArticlePage() {
  return (
    <main>
      <motion.section
        className="w-full p-8 md:py-14 md:px-[60px] lg:py-16 lg:px-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="w-full max-w-[900px] mx-auto mb-8 md:mb-[60px]">
          <div className="mb-10 flex items-center justify-between">
            <Button
              type="button"
              variant="text"
              className="flex gap-x-2 text-[10px] px-2.5 py-2 md:text-[15px]"
            >
              <Icon icon="material-symbols:arrow-back-rounded" />
              <span>Back</span>
            </Button>
            <Button
              type="button"
              variant="text"
              className="flex gap-x-2 text-[10px] px-2.5 py-2 md:text-[15px]"
            >
              <span>Read Next</span>
              <Icon icon="material-symbols:arrow-forward-rounded" />
            </Button>
          </div>

          <div className="text-center leading-tight">
            <h1
              className="text-[23px] text-neutral-800 font-semibold mb-6 md:text-[37px] md:mb-10 xl:text-[46px]"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h1>
            <p
              className="text-[15px] font-semibold text-neutral-800 mb-2 md:text-[19px] md:mb-1 xl:text-[23px] xl:mb-2"
            >
              Writer&rsquo;s Name
            </p>
            <p className="text-xs text-neutral-600 mb-6 md:text-[15px] xl:text-[19px]">
              14 March 2025
            </p>
            <div
              className="text-[10px] text-primary-600 font-medium bg-primary-200 px-3 py-1 rounded-4xl w-max mx-auto md:text-xs xl:text-[15px]"
            >
              5 min read
            </div>
          </div>
        </div>

        <div className="w-full max-w-[900px] mx-auto">
          <div className="mb-8 w-full h-auto aspect-16/10 overflow-hidden md:aspect-31/16 md:mb-[60px] xl:aspect-45/26">
            <img src="/image/59de8a682dfbe42455613ea07477ff3e30532c1f.webp" alt="Cover Article" className="size-full object-cover" />
          </div>

          <div
            className={cn(
              "text-balance text-[15px] font-medium text-neutral-600 space-y-8",
              "md:space-y-12 md:text-[19px] xl:text-[23px] xl:max-w-[780px] xl:mx-auto",
            )}
          >
            <h2 className="text-[19px] text-neutral-800 font-semibold leading-tight  md:text-[23px] xl:text-[29px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.
            </h2>
            <p className="leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.
            </p>

            <img src="/image/code-article.webp" alt="Code" className="w-full h-auto mb-12" />

            <p className="leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.
            </p>
            <p className="leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.
            </p>
          </div>
        </div>
      </motion.section>
    </main>
  )
}
