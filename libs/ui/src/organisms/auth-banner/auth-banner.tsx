import { ArrowLeftOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { Button } from "@imphnen-frontend-service/ui/atoms";
import { FC, ReactElement } from "react";

function AuthBanner({ text, href }: { text: string; href: string }) {
  return (
    <div className="hidden xl:block relative rounded-lg overflow-hidden w-[420px] min-h-[632px]">
      <img
        src="/image/95319c4f9953dfe6180200e529dfcea5.webp"
        alt="Banner"
        className="w-full h-full object-cover"
      />
      {/* Top Gradient */}
      <div className="absolute top-0 left-0 w-full h-[263px] bg-gradient-to-b from-[#23a1eb] to-transparent" />
      
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[263px] bg-gradient-to-t from-[#23a1eb] to-transparent" />

      {/* Navigation Button */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => (document.location.href = href)}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-md text-[#23a1eb] font-semibold text-[15px] shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Icon icon="lucide:chevron-left" width="16" height="16" />
          {text}
        </button>
      </div>

      {/* Logo */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-[317px]">
        <img
          src="/image/9261045e09137f3fcb925a78c55b6ddb.webp"
          alt="Logo"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}

export const LoginBanner: FC = (): ReactElement => {
    return AuthBanner({text: "Back To Homepage", href: "/"})
}

export const RegisterResetBanner: FC = (): ReactElement => {
    return AuthBanner({text: "Back To Login", href: "/auth/login"})
}