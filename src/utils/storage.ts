import { Applicant, ApplicationData } from '../types';

const STORAGE_KEY = 'job_applications';

export const saveApplication = (data: Applicant): void => {
  const existingData = getApplications();
  const updatedData = {
    ...existingData,
    [data.email]: data
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
};

export const getApplications = (): ApplicationData => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

export const getApplicationByEmail = (email: string): Applicant | null => {
  const applications = getApplications();
  return applications[email] || null;
};