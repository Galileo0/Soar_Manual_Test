import React from 'react';
import { Applicant } from '../../types';
import { POSITIONS, COMPANIES, LANGUAGES } from '../../constants/formOptions';

interface Props {
  formData: Applicant;
  onChange: (field: keyof Applicant, value: any) => void;
  onMultiSelect: (field: 'applyFor' | 'currentCompanies', value: string) => void;
}

export default function JobFields({ formData, onChange, onMultiSelect }: Props) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Applying for (select multiple)
        </label>
        <div className="space-y-2">
          {POSITIONS.map((position) => (
            <label key={position} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.applyFor.includes(position)}
                onChange={() => onMultiSelect('applyFor', position)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>{position}</span>
            </label>
          ))}
        </div>
      </div>

      {formData.applyFor.includes('Other') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specify Other Position
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={formData.otherPosition}
            onChange={(e) => onChange('otherPosition', e.target.value)}
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Companies (select multiple)
        </label>
        <div className="space-y-2">
          {COMPANIES.map((company) => (
            <label key={company} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.currentCompanies.includes(company)}
                onChange={() => onMultiSelect('currentCompanies', company)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>{company}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Years of Experience
        </label>
        <input
          type="number"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          value={formData.yearsOfExperience || ''}
          onChange={(e) => onChange('yearsOfExperience', parseInt(e.target.value) || 0)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Language
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          value={formData.language}
          onChange={(e) => onChange('language', e.target.value)}
        >
          <option value="">Select a language</option>
          {LANGUAGES.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}