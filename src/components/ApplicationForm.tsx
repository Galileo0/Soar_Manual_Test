import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Save } from 'lucide-react';
import { saveApplication, getApplicationByEmail } from '../utils/storage';
import { Applicant } from '../types';
import BasicInfoFields from './form/BasicInfoFields';
import ContactFields from './form/ContactFields';
import JobFields from './form/JobFields';
import DocumentUpload from './form/DocumentUpload';
import CertificateUpload from './form/CertificateUpload';
import toast from 'react-hot-toast';

export default function ApplicationForm() {
  const { email } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.state?.isEdit;

  const [formData, setFormData] = useState<Applicant>({
    email: email || '',
    firstName: '',
    lastName: '',
    age: 0,
    dateOfBirth: '',
    phoneNumber: '',
    linkedinUrl: '',
    applyFor: [],
    otherPosition: '',
    currentCompanies: [],
    yearsOfExperience: 0,
    language: '',
    resume: null,
    nationalIdImage: null,
    certificates: []
  });

  useEffect(() => {
    if (isEdit && email) {
      const existingData = getApplicationByEmail(email);
      if (existingData) {
        setFormData(existingData);
      }
    }
  }, [email, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveApplication(formData);
    toast.success(isEdit ? 'Application updated successfully!' : 'Application submitted successfully!');
    navigate('/');
  };

  const handleChange = (field: keyof Applicant, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field: 'applyFor' | 'currentCompanies', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleUploadError = (error: string) => {
    toast.error(error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {isEdit ? 'Edit Your Application' : 'Job Application Form'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <BasicInfoFields formData={formData} onChange={handleChange} />
          <ContactFields formData={formData} onChange={handleChange} />
          <JobFields 
            formData={formData} 
            onChange={handleChange}
            onMultiSelect={handleMultiSelect}
          />
          <DocumentUpload
            formData={formData}
            onChange={handleChange}
            onError={handleUploadError}
          />
          <CertificateUpload
            certificates={formData.certificates}
            onChange={(certificates) => handleChange('certificates', certificates)}
            onError={handleUploadError}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              <Save className="w-5 h-5" />
              <span>{isEdit ? 'Update Application' : 'Submit Application'}</span>
            </button>

            <button
              type="submit"
              className="flex items-center space-x-2 bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              <Save className="w-5 h-5" />
              <span>{isEdit ? 'Cancel' : 'Cancel'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}