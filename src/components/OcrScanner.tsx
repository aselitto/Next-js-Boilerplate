// src/components/OcrScanner.tsx
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

type OcrScannerProps = {
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

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      let url = '/api/ocr';
      if (simulateDelay) {
        // If simulateDelay prop is true, add a query parameter to simulate delay
        url += '?delay=2000'; // 2 seconds delay
      }

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setOcrText(data.text);
      } else {
        setError(data.error || t('ocr_failed'));
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

      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />

      <button
        type="button"
        onClick={handleScan}
        disabled={loading || !selectedFile}
        className={`rounded px-4 py-2 text-white ${
          loading || !selectedFile ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
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
