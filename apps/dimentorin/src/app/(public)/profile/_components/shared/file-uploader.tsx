import { FC, useRef, useState } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';

interface FileUploaderProps {
  accept?: string;
  maxSize?: number;
  onFileSelect?: (file: File) => void;
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
  dragAndDrop?: boolean;
  buttonText?: string;
  description?: string;
}

export const FileUploader: FC<FileUploaderProps> = ({
  accept = "*/*",
  maxSize = 10 * 1024 * 1024,
  onFileSelect,
  isLoading = false,
  className = "",
  children,
  dragAndDrop = false,
  buttonText = "Choose File",
  description = "Click to select a file"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`;
    }

    if (accept !== "*/*" && !accept.split(',').some(type => {
      const trimmedType = type.trim();
      if (trimmedType.startsWith('.')) {
        return file.name.toLowerCase().endsWith(trimmedType.toLowerCase());
      }
      return new RegExp(trimmedType.replace('*', '.*')).exec(file.type);
    })) {
      return `File type not supported. Accepted types: ${accept}`;
    }

    return null;
  };

  const handleFileSelect = (file: File) => {
    const error = validateFile(file);
    if (error) {
  // removed log
      return;
    }

    onFileSelect?.(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const triggerFileSelect = () => {
    if (!isLoading) {
      fileInputRef.current?.click();
    }
  };

  if (children) {
    return (
      <div className={`relative ${className}`}>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={isLoading}
          title="Select file to upload"
        />
        {children}
      </div>
    );
  }

  if (dragAndDrop) {
    return (
      <div className={className}>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          disabled={isLoading}
        />
        <button
          type="button"
          className={`w-full border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileSelect}
          disabled={isLoading}
          aria-label="Upload file by clicking or drag and drop"
        >
          {isLoading ? (
            <div className="flex flex-col items-center">
              <LoadingOutlined className="text-2xl text-blue-500 mb-2" />
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <>
              <UploadOutlined className="text-2xl text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-1">{description}</p>
              <p className="text-xs text-gray-500">
                {accept === "*/*" ? "Any file type" : accept} • Max {Math.round(maxSize / (1024 * 1024))}MB
              </p>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        disabled={isLoading}
      />
      <Button
        variant="secondary"
        onClick={triggerFileSelect}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <LoadingOutlined className="mr-2" />
            Uploading...
          </>
        ) : (
          <>
            <UploadOutlined className="mr-2" />
            {buttonText}
          </>
        )}
      </Button>
    </div>
  );
};
