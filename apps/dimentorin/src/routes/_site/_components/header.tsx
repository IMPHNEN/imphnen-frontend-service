import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Button } from "@imphnen-frontend-service/ui/atoms";
import { cn, For, Show } from "@imphnen-frontend-service/utils";
import { motion, useMotionValueEvent, useScroll, Variants } from "framer-motion";
import { FC, useMemo, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";

const MENUS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: 'Mentoring', href: '/mentoring' },
  { label: 'Resources', href: '/resources' },
  { label: 'Articles', href: '/articles' },
]

export const Header: FC = () => {
  const location = useLocation();
  const { scrollY } = useScroll()

  const [expandMenu, setExpandMenu] = useState(false);
  const [show, setShow] = useState(true)

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -100 },
    show: { opacity: 1, y: 0 },
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() || 0
    if (latest > prev && latest > 100) setShow(false) 
    else setShow(true)
  })

  const isActive = useMemo(() => {
    return (path: string) => {
      if (path === '/' && location.pathname !== '/') return false
      return location.pathname.includes(path)
    }
  }, [location.pathname]);

  return (
    <div className={cn("w-full px-8 pt-8 top-0 z-50 md:px-[60px] md:pt-[60px] lg:px-20 sticky", !show && "overflow-hidden")}>
      <motion.header
        className="bg-white shadow-lg rounded-lg h-12 flex justify-between w-full max-w-7xl xl:mx-auto md:h-[60px] lg:h-[71px]"
        aria-roledescription="nav"
        variants={headerVariants}
        animate={show ? "show" : "hidden"}
        transition={{ duration: 0.5, ease: "easeInOut" }}
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
                  isActive(menu.href) && "text-primary-500 hover:text-primary-500"
                )}
              >
                <Link to={menu.href}>{menu.label}</Link>
              </Button>
              )}
            </For>
            <Link to="/auth/login">
              <Button type="button" className="px-12 py-1 lg:hidden">Login</Button>
            </Link>
          </nav>

          <div>
            <Link to="/auth/login">
              <Button type="button" className="px-5 py-2 hidden lg:block">Login</Button>
            </Link>
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
      </motion.header>
    </div>
  );
}
