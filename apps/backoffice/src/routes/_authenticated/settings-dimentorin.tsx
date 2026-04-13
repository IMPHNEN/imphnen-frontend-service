import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import {
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@imphnen-frontend-service/ui/atoms';
import { BackofficeWrapper } from '@imphnen-frontend-service/ui/organisms';
import { GeneralSettings } from './_components/settings-dimentorin/general';
import { UserRolesPermission } from './_components/settings-dimentorin/user-roles-permission';
import { NotificationSettings } from './_components/settings-dimentorin/notification';
import { SecuritySettings } from './_components/settings-dimentorin/security';
import { PaymentSettings } from './_components/settings-dimentorin/payment';

export const Route = createFileRoute('/_authenticated/settings-dimentorin')({
  component: SettingsDimentorinPage,
});

function SettingsDimentorinPage(): React.ReactElement {
  return (
    <BackofficeWrapper
      title="Dimentorin Settings"
      description="Konfigurasi platform Dimentorin.dev"
    >
      <Tabs defaultValue="general" className="gap-6">
        <TabsList className="flex-wrap">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="notification">Notification</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardContent className="pt-6">
              <GeneralSettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="roles">
          <Card>
            <CardContent className="pt-6">
              <UserRolesPermission />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notification">
          <Card>
            <CardContent className="pt-6">
              <NotificationSettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardContent className="pt-6">
              <SecuritySettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payment">
          <Card>
            <CardContent className="pt-6">
              <PaymentSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </BackofficeWrapper>
  );
}
