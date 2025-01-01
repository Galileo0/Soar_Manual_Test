import React from 'react';
import { Upload } from 'lucide-react';
import { Applicant } from '../../types';
import { handleFileUpload } from '../../utils/fileHandling';

interface Props {
  formData: Applicant;
  onChange: (field: keyof Applicant, value: any) => void;
  onError: (error: string) => void;
}

export default function DocumentUpload({ formData, onChange, onError }: Props) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: 'resume' | 'nationalIdImage') => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        onError('File size must be less than 10MB');
        return;
      }

      try {
        const base64Data = await handleFileUpload(file);
        onChange(field, base64Data);
      } catch (error) {
        onError('Failed to upload file');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Resume
        </label>
        <FileUploadField
          accept=".pdf,.doc,.docx"
          onChange={(e) => handleFileChange(e, 'resume')}
          hasFile={!!formData.resume}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          National ID Image (** image only)
        </label>
        <FileUploadField
          accept="image/*,.doc,.pdf,.docx"
          onChange={(e) => handleFileChange(e, 'nationalIdImage')}
          hasFile={!!formData.nationalIdImage}
        />
      </div>
    </div>
  );
}

interface FileUploadFieldProps {
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasFile: boolean;
}

function FileUploadField({ accept, onChange, hasFile }: FileUploadFieldProps) {
  return (
    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
      <div className="space-y-1 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="flex text-sm text-gray-600">
          <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <span>Upload a file</span>
            <input
              type="file"
              className="sr-only"
              accept={accept}
              onChange={onChange}
            />
          </label>
        </div>
        {hasFile && (
          <p className="text-xs text-green-500">File uploaded successfully</p>
        )}
        <p className="text-xs text-gray-500">Up to 10MB</p>
      </div>
    </div>
  );
}