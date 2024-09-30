// src/components/InsuranceForm.tsx

'use client';

import type { User } from '@sentry/nextjs'; // Ensure this matches your User type 1 2
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setUser } from '@/store/slices/userSlice';

type InsuranceFormProps = {
  initialData: User | null;
};

type FormValues = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  policyNumber: string;
  groupNumber: string;
  // Add more fields as necessary
};

const InsuranceForm: React.FC<InsuranceFormProps> = ({ initialData }) => {
  const t = useTranslations('InsuranceForm');
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: initialData
      ? {
          firstName: initialData.firstName || '',
          lastName: initialData.lastName || '',
          address: initialData.address || '',
          email: initialData.email || '',
          policyNumber: initialData.policyNumber || '',
          groupNumber: initialData.groupNumber || '',
        }
      : {},
  });
  const [apiResponse, setApiResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>('');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    setApiError('');
    setApiResponse('');

    try {
      // Dispatch to Redux store
      dispatch(setUser({
        ...initialData,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        email: data.email,
        policyNumber: data.policyNumber,
        groupNumber: data.groupNumber,
        // Add more fields as necessary
      }));

      // Push data to Optum Eligible API
      const response = await fetch('/api/optum/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t('submission_failed'));
      }

      const result = await response.json();
      setApiResponse(result.message || t('submission_success'));
    } catch (error: any) {
      console.error('API Error:', error);
      setApiError(error.message || t('submission_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">{t('form_title')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            {t('first_name')}
          </label>
          <input
            id="firstName"
            {...register('firstName', { required: t('first_name_required') })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.firstName ? 'border-red-500' : ''
            }`}
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            {t('last_name')}
          </label>
          <input
            id="lastName"
            {...register('lastName', { required: t('last_name_required') })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.lastName ? 'border-red-500' : ''
            }`}
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            {t('address')}
          </label>
          <input
            id="address"
            {...register('address', { required: t('address_required') })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.address ? 'border-red-500' : ''
            }`}
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: t('email_required'),
              pattern: {
                value: /^\S[^\s@]*@\S+$/,
                message: t('email_invalid'),
              },
            })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        {/* Policy Number */}
        <div>
          <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700">
            {t('policy_number')}
          </label>
          <input
            id="policyNumber"
            {...register('policyNumber', { required: t('policy_number_required') })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.policyNumber ? 'border-red-500' : ''
            }`}
          />
          {errors.policyNumber && <p className="mt-1 text-sm text-red-600">{errors.policyNumber.message}</p>}
        </div>

        {/* Group Number */}
        <div>
          <label htmlFor="groupNumber" className="block text-sm font-medium text-gray-700">
            {t('group_number')}
          </label>
          <input
            id="groupNumber"
            {...register('groupNumber', { required: t('group_number_required') })}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.groupNumber ? 'border-red-500' : ''
            }`}
          />
          {errors.groupNumber && <p className="mt-1 text-sm text-red-600">{errors.groupNumber.message}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            {loading ? t('submitting') : t('submit')}
          </button>
        </div>

        {/* API Response Messages */}
        {apiResponse && <p className="mt-2 text-green-600">{apiResponse}</p>}
        {apiError && <p className="mt-2 text-red-600">{apiError}</p>}
      </form>
    </div>
  );
};

export default InsuranceForm;
