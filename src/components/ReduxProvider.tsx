// src/components/ReduxProvider.tsx

'use client'; // Ensure this is a client component

import React from 'react';
import { Provider } from 'react-redux';

import { store } from '@/store/store';

type ReduxProviderProps = {
  children: React.ReactNode;
};

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
