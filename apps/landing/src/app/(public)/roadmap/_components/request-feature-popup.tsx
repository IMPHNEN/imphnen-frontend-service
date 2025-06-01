'use client';

import * as React from 'react';

import { useMediaQuery } from '@/hooks/use-media-query';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Label,
  Textarea,
} from '@components';
import { cn } from '@utils';

export function RequestFeaturePopup() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary">Request Fitur</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Request Fitur</DialogTitle>
            <DialogDescription>
              Request fitur apa pun disini. Kami akan mempertimbangkan
              permintaan Anda.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary">Request Fitur</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Request Fitur</DrawerTitle>
          <DrawerDescription>
            Punya ide fitur keren? Bagikan di sini! Kami selalu terbuka untuk
            inovasi yang bisa membuat produk ini lebih baik.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="bordered">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface ProfileFormProps extends React.ComponentProps<'form'> {
  showFooterButton?: boolean;
}

function ProfileForm({
  className,
  showFooterButton = false,
}: ProfileFormProps) {
  const [description, setDescription] = React.useState('');
  const maxDescriptionLength = 10000;

  return (
    <form className={cn('grid items-start gap-8', className)}>
      <div className="grid gap-4">
        <Label htmlFor="namaFitur" className="font-medium">
          Nama Fitur *
        </Label>
        <Input
          id="namaFitur"
          placeholder="Masukkan nama fitur yang diinginkan"
          className="h-11"
        />
      </div>

      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="deskripsiFitur" className="font-medium">
            Deskripsi Fitur *
          </Label>
          <span className="text-sm text-muted-foreground">
            {description.length}/{maxDescriptionLength}
          </span>
        </div>
        <Textarea
          id="deskripsiFitur"
          placeholder="Jelaskan fitur yang Anda inginkan secara detail..."
          maxLength={maxDescriptionLength}
          rows={6}
          className="min-h-[150px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p className="text-sm text-muted-foreground -mt-2">
          Jelaskan manfaat dan cara kerja fitur yang Anda inginkan
        </p>
      </div>

      {!showFooterButton && (
        <Button type="submit" size="lg" className="mt-2">
          Kirim Permintaan
        </Button>
      )}
    </form>
  );
}
