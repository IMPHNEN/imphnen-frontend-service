import { Button } from "@imphnen-frontend-service/ui/atoms"
import { cn, Show } from "@imphnen-frontend-service/utils"
import { FC } from "react"
import { Link } from "react-router-dom"

export type ArticleCardProps = {
  variant?: "default" | "recent" | "featured"
}

export const ArticleCard: FC<ArticleCardProps> = ({ variant = 'default' }) => {
  return (
    <div
      className={cn(
        variant === "recent" && "md:grid md:grid-cols-2 md:gap-7 xl:flex xl:items-center",
      )}
    >
      <div
        className={cn(
          "w-full h-auto aspect-16/10 overflow-hidden mb-8 md:h-60 md:w-full xl:aspect-auto",
          variant === "featured" && "md:h-[300px]",
          variant === "recent" && "md:h-auto md:w-full md:aspect-15/7 md:mb-0 xl:aspect-square xl:w-[162px] xl:h-auto",
        )}
      >
        <img
          src="/image/59de8a682dfbe42455613ea07477ff3e30532c1f.webp"
          alt="Cover's Article"
          className={cn("w-full object-cover", variant === "recent" && "h-full")}
        />
      </div>

      <div className={cn("leading-tight", variant === "recent" && "xl:flex-1")}>
        <div className="w-max bg-primary-200 text-primary-600 px-3 py-1 text-xs font-medium rounded-4xl mb-4 xl:mb-[15px]">
          5 min read
        </div>
        <Link
          to="/articles/detail"
          className={cn(
            "text-[15px] text-neutral-800 font-semibold mb-4 line-clamp-2 md:text-[19px] xl:mb-[23px]",
            variant === "featured" && "text-[19px] md:text-[23px]",
            variant === "recent" && "mb-7 xl:text-[27px]"
          )}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Link>
        <Show condition={variant !== "recent"}>
          <p 
            className={cn(
              "text-xs text-neutral-600 mb-6 md:text-[15px] md:mb-8 xl:text-[19px]",
              variant === "featured" && "text-[15px] md:text-[19px] md:mb-6",
            )}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
          </p>
        </Show>
        <div
          className={cn(
            "flex justify-between items-center text-xs text-neutral-600 md:text-[15px] xl:text-[19px]",
            variant === "default" && "mb-4",
            variant === "featured" && "text-[15px] md:text-[19px] xl:text-base",
          )}
        >
          <p>Writer’s Name</p>
          <p>14 March 2025</p>
        </div>

        <Show condition={variant === "default"}>
          <Button type="button" size="sm" className="px-2.5 py-2">
            Baca Artikel
          </Button>
        </Show>
      </div>
    </div>
  )
}
