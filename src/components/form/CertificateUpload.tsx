import React from 'react';
import { Upload, X } from 'lucide-react';
import { Certificate } from '../../types';
import { handleFileUpload } from '../../utils/fileHandling';
import { generateId } from '../../utils/helpers';

interface Props {
  certificates: Certificate[];
  onChange: (certificates: Certificate[]) => void;
  onError: (error: string) => void;
}

export default function CertificateUpload({ certificates, onChange, onError }: Props) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        onError('File size must be less than 10MB');
        return;
      }

      try {
        const base64Data = await handleFileUpload(file);
        const newCertificate: Certificate = {
          id: generateId(),
          name: file.name,
          file: base64Data
        };
        onChange([...certificates, newCertificate]);
      } catch (error) {
        onError('Failed to upload certificate');
      }
    }
  };

  const removeCertificate = (id: string) => {
    onChange(certificates.filter(cert => cert.id !== id));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Certificates
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates.map(cert => (
          <CertificatePreview
            key={cert.id}
            certificate={cert}
            onRemove={removeCertificate}
          />
        ))}
      </div>

      <div className="mt-2">
        <FileUploadField onChange={handleFileChange} />
      </div>
    </div>
  );
}

interface PreviewProps {
  certificate: Certificate;
  onRemove: (id: string) => void;
}

function CertificatePreview({ certificate, onRemove }: PreviewProps) {
  const isPDF = certificate.file.includes('application/pdf');

  return (
    <div className="relative p-4 border rounded-lg bg-gray-50">
      <button
        onClick={() => onRemove(certificate.id)}
        className="absolute top-2 right-2 p-1 bg-red-100 rounded-full hover:bg-red-200"
      >
        <X className="w-4 h-4 text-red-600" />
      </button>
      
      <div className="flex items-center space-x-3">
        {isPDF ? (
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <span className="text-red-600 font-semibold">PDF</span>
          </div>
        ) : (
          <img
            src={certificate.file}
            alt={certificate.name}
            className="w-12 h-12 object-cover rounded-lg"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {certificate.name}
          </p>
          <a
            href={certificate.file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-600 hover:text-indigo-500"
          >
            View
          </a>
        </div>
      </div>
    </div>
  );
}

function FileUploadField({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
      <div className="space-y-1 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="flex text-sm text-gray-600">
          <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <span>Upload a certificate</span>
            <input
              type="file"
              className="sr-only"
              accept=".pdf,image/*"
              onChange={onChange}
            />
          </label>
        </div>
        <p className="text-xs text-gray-500">PDF or images up to 10MB</p>
      </div>
    </div>
  );
}