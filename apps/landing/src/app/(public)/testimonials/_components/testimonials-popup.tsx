'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Label,
  Textarea,
} from '@components';
import { cn } from '@utils';
import * as React from 'react';
import { useRef, useState } from 'react';
import { LuArrowLeft, LuUpload, LuUser, LuX } from 'react-icons/lu';

export function TestimonialPopup() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Tambah Testimoni</Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-2">
            <DialogTitle>Tulis Testimoni</DialogTitle>
          </DialogHeader>
          <TestimonialForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Tambah Testimoni</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="pb-0">
          <DrawerTitle>Tulis Testimoni</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto px-4">
          <TestimonialForm setOpen={setOpen} className="py-2" />
        </div>
        <DrawerFooter className="pt-2 pb-4">
          <DrawerClose asChild>
            <Button variant="bordered">Batal</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface TestimonialFormProps extends React.ComponentProps<'div'> {
  setOpen: (open: boolean) => void;
}

function TestimonialForm({ className, setOpen }: TestimonialFormProps) {
  const [step, setStep] = useState(1);
  const [testimonialError, setTestimonialError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    testimonial: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Hanya file gambar yang diizinkan');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validateStep1 = () => {
    return formData.name.trim() !== '' && formData.email.trim() !== '';
  };

  const handleNextStep = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTestimonialError(false);

    if (formData.testimonial.trim() === '') {
      setTestimonialError(true);
      return;
    }

    console.log('Testimonial submitted:', formData);
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setTestimonialError(false);
    setAvatarPreview(null);
    setFormData({
      name: '',
      email: '',
      role: '',
      testimonial: '',
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={cn('w-full', className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          {step === 1 && (
            <div className="w-full">
              {/* Section header with step info aligned using justify-between */}
              <div className="flex justify-between items-center pb-3 border-b mb-4">
                <h3 className="text-base font-semibold">Lengkapi Data Diri</h3>
                <span className="text-sm text-muted-foreground">
                  Langkah 1 dari 2
                </span>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col items-center gap-3 mb-4">
                  <div className="relative">
                    <Avatar className="w-20 h-20 border-2 border-dashed rounded-full">
                      {avatarPreview ? (
                        <AvatarImage
                          src={avatarPreview}
                          alt="Preview"
                          className="object-cover"
                        />
                      ) : (
                        <AvatarFallback className="bg-secondary">
                          <LuUser className="w-8 h-8 text-muted-foreground" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {avatarPreview && (
                      <button
                        type="button"
                        onClick={removeAvatar}
                        className="absolute -top-1 -right-1 bg-background rounded-full p-1 shadow-md border"
                        aria-label="Hapus foto"
                      >
                        <LuX className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <div className="text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                      aria-label="Unggah foto"
                    />
                    <Button
                      type="button"
                      variant="bordered"
                      className="border-dashed h-8 px-3 text-xs"
                      onClick={triggerFileInput}
                    >
                      <LuUpload className="w-3 h-3 mr-1" />
                      {avatarPreview ? 'Ganti Foto' : 'Unggah Foto'}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      Maks. 2MB (JPEG, PNG)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      id: 'name',
                      label: 'Nama',
                      placeholder: 'Nama lengkap',
                      required: true,
                    },
                    {
                      id: 'email',
                      label: 'Email',
                      placeholder: 'email@contoh.com',
                      type: 'email',
                      required: true,
                    },
                    {
                      id: 'role',
                      label: 'Role',
                      placeholder: 'Backend Developer',
                      required: true,
                    },
                  ].map((field) => (
                    <div key={field.id} className="space-y-1">
                      <Label htmlFor={field.id} className="text-sm">
                        {field.label}
                      </Label>
                      <Input
                        id={field.id}
                        type={field.type || 'text'}
                        placeholder={field.placeholder}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={(e) =>
                          handleInputChange(field.id, e.target.value)
                        }
                        required={field.required}
                        className="py-2"
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Button
                    type="button"
                    size="lg"
                    className="w-full"
                    onClick={handleNextStep}
                    disabled={!validateStep1()}
                  >
                    Lanjut
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="w-full">
              {/* Section header with step info aligned using justify-between */}
              <div className="flex justify-between items-center pb-3 border-b mb-4">
                <h3 className="text-base font-semibold">Ulasan</h3>
                <span className="text-sm text-muted-foreground">
                  Langkah 2 dari 2
                </span>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="testimonial" className="text-sm">
                      Testimoni
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {formData.testimonial.length}/500
                    </span>
                  </div>

                  <Textarea
                    id="testimonial"
                    placeholder="Bagaimana pengalaman Anda bersama IMPHNEN?"
                    className={cn(
                      'min-h-[140px]',
                      testimonialError && 'border-destructive'
                    )}
                    value={formData.testimonial}
                    onChange={(e) =>
                      handleInputChange('testimonial', e.target.value)
                    }
                    maxLength={500}
                  />
                  {testimonialError && (
                    <div className="text-destructive text-xs mt-1">
                      Harap isi testimonial
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="bordered"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    <LuArrowLeft className="w-4 h-4 mr-1" />
                    Kembali
                  </Button>
                  <Button type="submit" size="lg" className="flex-1">
                    Kirim
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
