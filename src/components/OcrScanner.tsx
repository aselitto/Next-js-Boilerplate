// src/components/OcrScanner.tsx

'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setUser } from '@/store/slices/userSlice';
import type { User } from '@/types/User'; // Ensure this interface is defined as per previous instructions

import InsuranceForm from './Forms/InsuranceForm';

export type OcrScannerProps = {
  simulateDelay?: boolean;
};

const OcrScanner: React.FC<OcrScannerProps> = ({ simulateDelay = false }) => {
  const t = useTranslations('OcrScanner');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ocrText, setOcrText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOcrText('');
    setError('');
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Extraction functions using regex
  const extractFirstName = (text: string): string => {
    const match = text.match(/Policy Holder:\s*([A-Z]+)/i);
    return match ? match[1] || '' : '';
  };

  const extractLastName = (text: string): string => {
    const match = text.match(/Policy Holder:\s*[A-Z]+\s+([A-Z]+)/i);
    return match ? match[1] || '' : '';
  };

  const extractAddress = (text: string): string => {
    const match = text.match(/Address:\s*([0-9A-Z\s,]+)/i);
    return match ? match[1]?.trim() || '' : '';
  };

  const extractEmail = (text: string): string => {
    const match = text.match(/Email:\s*([\w.-]+@[\w.-]+\.\w+)/i);
    return match ? match[1] || '' : '';
  };

  const extractPolicyNumber = (text: string): string => {
    const match = text.match(/Policy Number:\s*([A-Z0-9]+)/i);
    return match ? match[1] || '' : '';
  };

  const extractGroupNumber = (text: string): string => {
    const match = text.match(/Group Number:\s*([A-Z0-9]+)/i);
    return match ? match[1] || '' : '';
  };

  // Function to parse OCR text and extract user details
  const parseOcrText = (text: string): User => {
    const user: User = {
      firstName: extractFirstName(text),
      lastName: extractLastName(text),
      address: extractAddress(text),
      email: extractEmail(text),
      policyNumber: extractPolicyNumber(text),
      groupNumber: extractGroupNumber(text),
      // Add other fields as necessary 1
    };
    return user;
  };

  const handleScan = async () => {
    if (!selectedFile) {
      setError(t('select_image'));
      return;
    }

    setLoading(true);
    setError('');
    setOcrText('');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const url = '/api/ocr'; // Adjust if necessary

      const fetchUrl = simulateDelay ? `${url}?delay=2000` : url;

      const response = await fetch(fetchUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || t('ocr_failed'));
        return;
      }

      const data = await response.json();
      setOcrText(data.text);

      // Parse OCR text to extract user details
      const extractedData = parseOcrText(data.text);

      // Optional: Validate extracted data before dispatching
      if (
        extractedData.firstName
        && extractedData.lastName
        && extractedData.address
        && extractedData.email
        && extractedData.policyNumber
        && extractedData.groupNumber
      ) {
        dispatch(setUser(extractedData));
      } else {
        setError(t('incomplete_data'));
      }
    } catch (err) {
      console.error('Scan Error:', err);
      setError(t('network_error'));
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="rounded bg-white p-4 shadow-md">
      <h2 className="mb-4 text-xl font-bold">{t('scan_button_label')}</h2>

      <label
        htmlFor="file-input"
        className="mb-4 inline-block cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        {t('choose_image')}
      </label>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {selectedFile && (
        <p className="mb-2">
          {t('selected_file')}
          :
          {selectedFile.name}
        </p>
      )}

      <button
        type="button"
        onClick={handleScan}
        disabled={loading || !selectedFile}
        className={`rounded px-4 py-2 text-white ${
          loading || !selectedFile
            ? 'cursor-not-allowed bg-gray-400'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? t('scan_in_progress') : t('scan')}
      </button>

      {error && <p className="mt-2 text-red-500">{error}</p>}

      {ocrText && (
        <textarea
          className="mt-4 w-full rounded border p-2"
          rows={10}
          value={ocrText}
          readOnly
        />
      )}
      <InsuranceForm initialData={null} />
    </div>
  );
};

export default OcrScanner;
