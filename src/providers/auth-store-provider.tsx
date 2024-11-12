'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import { type AuthStore, createAuthStore } from '@/stores/auth-store';

export type CounterStoreAPI = ReturnType<typeof createAuthStore>;

export const AuthStoreContext = createContext<CounterStoreAPI | undefined>(
	undefined
);

export interface AuthStoreProviderProps {
	children: ReactNode;
}

export const AuthStoreProvider = ({ children }: AuthStoreProviderProps) => {
	const storeRef = useRef<CounterStoreAPI>();
	if (!storeRef.current) {
		storeRef.current = createAuthStore();
	}

	return (
		<AuthStoreContext.Provider value={storeRef.current}>
			{children}
		</AuthStoreContext.Provider>
	);
};

export const useAuthStore = <T,>(selector: (store: AuthStore) => T) => {
	const authStoreContext = useContext(AuthStoreContext);

	if (!authStoreContext) {
		throw new Error('useAuthStore must be used within an AuthStoreProvider');
	}

	return useStore(authStoreContext, selector);
};
