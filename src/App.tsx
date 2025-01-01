import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import EmailCheck from './components/EmailCheck';
import ApplicationForm from './components/ApplicationForm';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<EmailCheck />} />
        <Route path="/application/:email" element={<ApplicationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;