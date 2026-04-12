import { createFileRoute, useNavigate } from '@tanstack/react-router';
import * as React from 'react';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@imphnen-frontend-service/ui/atoms';
import { InputField } from '@imphnen-frontend-service/ui/molecules';
import { BackofficeWrapper } from '@imphnen-frontend-service/ui/organisms';
import {
  useUserList,
  useUpdateUserById,
} from '@imphnen-frontend-service/service';

export const Route = createFileRoute('/_authenticated/accounts_/$id')({
  component: AccountsEditPage,
});

function AccountsEditPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const updateUser = useUpdateUserById();

  const { data: usersData, isLoading } = useUserList({
    search: '',
    per_page: 100,
  });
  const user = usersData?.data?.find((u) => u.id === id);

  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    if (user) {
      setFullName(user.fullname);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      await updateUser.mutateAsync({
        id,
        data: { fullname: fullName, email },
      });
      toast.success('Data akun berhasil diperbarui');
      navigate({ to: '/accounts' });
    } catch (error) {
      console.log(error);
      toast.error('Data akun gagal diperbarui');
    }
  };

  return (
    <BackofficeWrapper title="Edit Data Akun">
      <div className="mx-auto w-full max-w-2xl">
        <Button
          variant="text"
          size="sm"
          onClick={() => navigate({ to: '/accounts' })}
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="size-4" />
          Kembali
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Edit Data Akun</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                Memuat data…
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <InputField
                  label="Nama Lengkap"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  size="md"
                />
                <InputField
                  label="Email"
                  type="text"
                  placeholder="Masukkan email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="md"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate({ to: '/accounts' })}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleSubmit}
              disabled={updateUser.isPending || isLoading}
            >
              {updateUser.isPending ? 'Menyimpan…' : 'Perbarui Data'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </BackofficeWrapper>
  );
}
