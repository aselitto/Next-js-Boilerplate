'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

export type OcrScannerProps = {
  simulateDelay?: boolean;
};

const OcrScanner: React.FC<OcrScannerProps> = ({ simulateDelay = false }) => {
  const t = useTranslations('OcrScanner');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ocrText, setOcrText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOcrText('');
    setError('');
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleScan = async () => {
    if (!selectedFile) {
      setError(t('select_image'));
      return;
    }

    setLoading(true);
    setError('');
    setOcrText('');

    const handleOcrScan = async () => {
      try {
        const formData = new FormData();
        formData.append('image', selectedFile);

        // Determine the API URL based on the environment
        const isStorybook = typeof window !== 'undefined' && window.location.hostname === 'localhost';
        const url = isStorybook
          ? 'https://your-project.vercel.app/api/ocr' // Replace with your actual Vercel URL
          : '/api/ocr';

        if (simulateDelay) {
          // Append delay query parameter if needed
          const urlWithDelay = `${url}?delay=2000`;
          const response = await fetch(urlWithDelay, {
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
        } else {
          const response = await fetch(url, {
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
        }
      } catch (err) {
        console.error('Scan Error:', err);
        setError(t('network_error'));
      } finally {
        setLoading(false);
      }
    };

    await handleOcrScan();
  };

  return (
    <div className="rounded bg-white p-4 shadow-md">
      <h2 className="mb-4 text-xl font-bold">{t('scan_button_label')}</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        type="button"
        onClick={handleScan}
        disabled={loading || !selectedFile}
        className={`rounded px-4 py-2 text-white ${
          loading || !selectedFile
            ? 'bg-gray-400'
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
    </div>
  );
};

export default OcrScanner;
