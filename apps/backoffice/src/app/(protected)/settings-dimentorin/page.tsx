import { BackofficeWrapper } from "@imphnen-frontend-service/ui/organisms"
import { cn, For } from "@imphnen-frontend-service/utils"
import { useState } from "react"
import { GeneralSettings } from "./_components/general"
import { UserRolesPermission } from "./_components/user-roles-permission"
import { NotificationSettings } from "./_components/notification"
import { SecuritySettings } from "./_components/security"
import { PaymentSettings } from "./_components/payment"

const TABS = {
  general: "General Settings",
  userRolePermissions: "User Roles & Permissions",
  notification: "Notification Settings",
  security: "Security",
  payment: "Payment",
} as const
type Tabs = typeof TABS[keyof typeof TABS]

export default function Components(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<Tabs>(TABS.general)

  return (
    <BackofficeWrapper title="Dimentorin.dev">
      <h1 className="text-p1 font-semibold text-neutral-700 mb-8">Settings</h1>

      <div className="flex items-start gap-x-8">
        <div className="w-64 bg-white p-2.5 shadow space-y-2 rounded-md">
          <For data={Object.values(TABS)}>
            {(tab) => (
              <button
                key={tab}
                className={cn(
                  "px-4 py-3 w-full text-left font-medium rounded-md text-neutral-400 cursor-pointer select-none hover:bg-primary-100",
                  activeTab === tab && "bg-primary-500 text-white hover:bg-primary-600"
                )}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            )}
          </For>
        </div>
        <div className="bg-white px-8 py-6 shadow space-y-2 rounded-md flex-1">
          {activeTab === TABS.general && <GeneralSettings />}
          {activeTab === TABS.userRolePermissions && <UserRolesPermission />}
          {activeTab === TABS.notification && <NotificationSettings />}
          {activeTab === TABS.security && <SecuritySettings />}
          {activeTab === TABS.payment && <PaymentSettings />}
        </div>
      </div>
    </BackofficeWrapper>
  )
}
