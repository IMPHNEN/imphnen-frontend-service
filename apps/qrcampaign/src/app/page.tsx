import { useState } from 'react';
import { Dropzone } from './features/watermark/components/Dropzone';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { toast } from 'sonner';
import { api } from './features/auth/api/auth.service';

export default function HomePage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageDropped = (file: File) => {
    setImageFile(file);
    setGeneratedImage(null); // Reset previous result
    toast.success('Image selected ready for generation!');
  };

  const handleReset = () => {
    setImageFile(null);
    setGeneratedImage(null);
  };

  const handleGenerate = async () => {
    if (!imageFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await api.post('/campaigns/process-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      const imageUrl = URL.createObjectURL(response.data);
      setGeneratedImage(imageUrl);
      toast.success('QR Code generated successfully!');
    } catch (error: any) {
      console.error(error);
      const message =
        error.response?.data?.message || 'Failed to generate QR code.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `qr-campaign-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 flex flex-col gap-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          QR Code Generator
        </h1>
        <p className="text-gray-600">
          Upload your image to add the campaign QR code watermark.
        </p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        {!imageFile ? (
          <Dropzone onImageDropped={handleImageDropped} />
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-full max-w-2xl bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center p-20 gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                  <p className="text-gray-500 font-medium">
                    Processing image...
                  </p>
                </div>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated with QR"
                  className="w-full h-auto object-contain max-h-[600px]"
                />
              ) : (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Original"
                    className="w-full h-auto object-contain max-h-[400px]"
                  />
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none">
                    <span className="bg-black/60 text-white px-3 py-1 rounded-2xl text-sm">
                      Original Image
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              {!generatedImage && !isLoading && (
                <>
                  <Button
                    variant="bordered"
                    onClick={handleReset}
                    className="w-32"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleGenerate}
                    className="w-40"
                    disabled={isLoading}
                  >
                    Generate QR
                  </Button>
                </>
              )}

              {generatedImage && (
                <>
                  <Button variant="bordered" onClick={handleReset}>
                    Upload Another
                  </Button>
                  <Button variant="primary" onClick={handleDownload}>
                    Download
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
