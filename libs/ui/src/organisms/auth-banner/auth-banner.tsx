import { ArrowLeftOutlined } from "@ant-design/icons";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Button } from "@imphnen-frontend-service/ui/atoms";
import { FC, ReactElement } from "react";

function AuthBanner({text, href}: {text: string, href: string}){
    return (
        <div className='relative rounded-md'>
          <img src="/image/95319c4f9953dfe6180200e529dfcea5.jpeg" alt="Banner" className='w-[420px] h-[632px] object-[80%] object-cover rounded-lg' />
          <div className='absolute top-0 bg-gradient-to-b from-primary-500 to-transparent w-full rounded-t-lg h-[163px] py-5 px-5'>
            <Button variant='secondary' className='gap-2' onClick={() => document.location.href = `${href}`}>
              <ArrowLeftOutlined />
              <p>{text}</p>
            </Button>
          </div>
          <div className='absolute bottom-0 bg-gradient-to-t from-primary-500 to-transparent w-full rounded-b-lg h-[263px] flex flex-col items-center justify-center'>
            <img src="/image/9261045e09137f3fcb925a78c55b6ddb.png" alt="Logo" width={317} />
          </div>
        </div>
    )
}

export const LoginBanner: FC = (): ReactElement => {
    return AuthBanner({text: "Back To Homepage", href: "/"})
}

export const RegisterResetBanner: FC = (): ReactElement => {
    return AuthBanner({text: "Back To Login", href: "/auth/login"})
}