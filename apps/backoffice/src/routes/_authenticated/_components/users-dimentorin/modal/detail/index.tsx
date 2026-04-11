import { Button } from "@imphnen-frontend-service/ui/atoms"
import { Modal } from "@imphnen-frontend-service/ui/molecules"
import { cn, For, Show } from "@imphnen-frontend-service/utils"
import { FC, useEffect, useState } from "react"
import { AccountProfile } from "./account-profile"
import { DetailProfile } from "./detail-profile"
import { ActivityLog } from "./activity-log"
import { ModalDetailUserProps } from "./type"

const TABS = {
  account: 'account profile',
  detail: 'detail profile',
  activity: 'activity logs',
} as const
type TabType = typeof TABS[keyof typeof TABS]

export const ModalDetailUser: FC<ModalDetailUserProps> = ({
  open,
  setOpen,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(TABS.account)

  useEffect(() => {
    if (!open) setActiveTab(TABS.account)
  }, [open])

  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
      className="xl:max-w-[84rem] bg-white px-10 py-9"
      closeButtonClassName="hidden"
    >
      <div>
        <h1 className="bg-primary-50 px-6 py-3 text-neutral-800 text-p2 font-semibold mb-8">
          Detail - Muhammad Firdaus Oiwobo
        </h1>

        <div className="flex gap-2 bg-primary-100 p-1.5 rounded-md w-max mb-8">
          <For data={Object.values(TABS)}>
            {(tab) => (
              <Button
                key={tab}
                variant="text"
                className={cn("px-3 py-2 capitalize", activeTab === tab && "bg-white")}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            )}
          </For>
        </div>

        <div>
          <Show condition={activeTab === TABS.account}>
            <AccountProfile open={open} setOpen={setOpen} />
          </Show>
          <Show condition={activeTab === TABS.detail}>
            <DetailProfile />
          </Show>
          <Show condition={activeTab === TABS.activity}>
            <ActivityLog />
          </Show>
        </div>
      </div>
    </Modal>
  )
}
