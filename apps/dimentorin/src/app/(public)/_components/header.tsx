import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Button } from "@imphnen-frontend-service/ui/atoms";
import { cn, For, Show } from "@imphnen-frontend-service/utils";
import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MENUS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: 'Mentoring', href: '/mentoring' },
  { label: 'Resources', href: '/resources' },
  { label: 'Articles', href: '/articles' },
]

export const Header: FC = () => {
  const location = useLocation();
  const [expandMenu, setExpandMenu] = useState(false);

  return (
    <div className="w-full px-8 pt-8 top-0 z-50 md:px-[60px] md:pt-[60px] lg:px-20 sticky">
      <header
        className="bg-white shadow-lg rounded-lg h-12 flex justify-between w-full max-w-7xl xl:mx-auto md:h-[60px] lg:h-[71px]"
        aria-roledescription="nav"
      >
        <div className="flex w-full items-center justify-between p-4 md:px-8 md:py-2.5">
          <div className="flex items-center">
            <img
              src="/logos/simple.svg"
              alt="IMPHNEN Logo"
              className="h-8 md:h-10 lg:h-[52px] w-auto"
            />
          </div>

          <nav
            className={cn(
              "flex flex-col items-center py-2 fixed top-24 bg-white shadow-lg rounded-lg transition-all duration-300",
              "md:top-32 lg:static lg:py-0 lg:flex-row lg:bg-transparent lg:shadow-none lg:gap-x-4",
              !expandMenu ? "-right-96" : "right-8 md:right-[60px]"
            )}
          >
            <For data={MENUS}>
              {(menu) => (
                <Button
                key={menu.label}
                type="button"
                variant="text"
                className={cn(
                  "px-10 py-1.5 text-neutral-300 hover:text-neutral-400 lg:px-2.5 lg:py-2",
                  location.pathname === menu.href && "text-primary-500 hover:text-primary-500"
                )}
              >
                <Link to={menu.href}>{menu.label}</Link>
              </Button>
              )}
            </For>
            <Button type="button" className="px-12 py-1 md:hidden">Login</Button>
          </nav>

          <div>
            <Button type="button" className="px-5 py-2 hidden lg:block">Login</Button>
            <Button
              type="button"
              variant="text"
              className={cn("transition-transform duration-300 rotate-0 lg:hidden", expandMenu && "rotate-90")}
              onClick={() => setExpandMenu(prev => !prev)}
            >
              <Show condition={!expandMenu} fallback={<CloseOutlined />}>
                <MenuOutlined />
              </Show>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
