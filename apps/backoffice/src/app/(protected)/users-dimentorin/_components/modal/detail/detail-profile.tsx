import { Icon } from "@iconify/react"
import { Button } from "@imphnen-frontend-service/ui/atoms"
import { For } from "@imphnen-frontend-service/utils"
import { FC } from "react"

const SOCIAL_LINKS = [
  { icon: <Icon icon="mdi:linkedin" className="text-2xl" />, url: "https://linkedin.com", label: "LinkedIn" },
  { icon: <Icon icon="mdi:github" className="text-2xl" />, url: "https://github.com", label: "Github" },
  { icon: <Icon icon="mingcute:meta-line" className="text-2xl" />, url: "https://facebook.com", label: "Facebook (Meta)" },
  { icon: <Icon icon="mdi:stack-overflow" className="text-2xl" />, url: "https://stackoverflow.com", label: "Stack Overflow" }
]

export const DetailProfile: FC = () => {
  return (
    <div>
      <div className="shadow rounded-lg p-8 mb-7">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-x-6">
            <div className="size-[54px] rounded-full overflow-hidden">
              <img src="/images/asd687hwq6nds4dfjj2983.webp" alt="Profile" className="w-full object-cover" />
            </div>
            <div>
              <h1 className="text-p2 font-semibold text-neutral-800">Muhammad Firdaus Oiwobo</h1>
              <p className="text-p3 font-medium text-neutral-600">Mentor</p>
            </div>
          </div>
          <Button type="button" variant="text" className="bg-primary-100">
            Actively Seeking Job
          </Button>
        </div>
        
        <div className="flex items-center gap-5">
          <For data={SOCIAL_LINKS}>
            {({ icon, url, label }) => (
              <a key={url} href={url} target="_blank" rel="noreferrer">
                <Button type="button" size="sm" className="flex items-center gap-x-2">
                  {icon}
                  {label}
                </Button>
              </a>
            )}
          </For>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-7">
        <div className="text-pretty px-8 py-10 rounded-lg shadow h-max">
          <h1 className="text-p2 font-semibold text-neutral-800 mb-6">Description</h1>
          <p className="text-p3 font-medium text-neutral-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.
          </p>
        </div>
        <div className="px-8 py-10 rounded-lg shadow h-max">
          <h1 className="text-p2 font-semibold text-neutral-800 mb-6">Personal Informations</h1>
          <div className="grid gap-6">
            <div className="flex items-center gap-x-5">
              <div className="bg-primary-50 rounded-full p-2.5 flex items-center justify-center text-primary-500">
                <Icon icon="ic:outline-mail" className="text-3xl" />
              </div>
              <div className="text-p3">
                <p className="text-neutral-800 font-semibold">rzalaxib23@gmail.com</p>
                <p className="text-neutral-600 font-medium">Email Address</p>
              </div>
            </div>
            <div className="flex items-center gap-x-5">
              <div className="bg-primary-50 rounded-full p-2.5 flex items-center justify-center text-primary-500">
                <Icon icon="cil:phone" className="text-3xl" />
              </div>
              <div className="text-p3">
                <p className="text-neutral-800 font-semibold">+62 888 8888 8888</p>
                <p className="text-neutral-600 font-medium">Phone Number</p>
              </div>
            </div>
            <div className="flex items-center gap-x-5">
              <div className="bg-primary-50 rounded-full p-2.5 flex items-center justify-center text-primary-500">
                <Icon icon="ion:location-outline" className="text-3xl" />
              </div>
              <div className="text-p3">
                <p className="text-neutral-800 font-semibold">Jl. Mergosari, Kec. Suryakencana, Banjaran</p>
                <p className="text-neutral-600 font-medium">Location</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
