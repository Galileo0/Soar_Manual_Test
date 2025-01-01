import React from 'react';
import { Applicant } from '../../types';

interface Props {
  formData: Applicant;
  onChange: (field: keyof Applicant, value: any) => void;
}

export default function ContactFields({ formData, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          value={formData.phoneNumber}
          onChange={(e) => onChange('phoneNumber', e.target.value)}
          placeholder="+1234567890"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          LinkedIn URL
        </label>
        <input
          type="url"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          value={formData.linkedinUrl}
          onChange={(e) => onChange('linkedinUrl', e.target.value)}
          placeholder="https://linkedin.com/in/username"
        />
      </div>
    </div>
  );
}