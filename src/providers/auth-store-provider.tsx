'use client'

import { type ReactNode, createContext, useState, useContext } from 'react'
import { useStore } from 'zustand'

import { type AuthStore, createAuthStore } from '@/stores/auth-store'

export type AuthStoreAPI = ReturnType<typeof createAuthStore>

export const AuthStoreContext = createContext<AuthStoreAPI | undefined>(undefined)

export interface AuthStoreProviderProps {
	children: ReactNode
}

export const AuthStoreProvider = ({ children }: AuthStoreProviderProps) => {
	const [store] = useState(() => createAuthStore())

	return (
		<AuthStoreContext.Provider value={store}>
			{children}
		</AuthStoreContext.Provider>
	)
}

export const useAuthStore = <T,>(selector: (store: AuthStore) => T) => {
	const authStoreContext = useContext(AuthStoreContext)

	if (!authStoreContext) {
		throw new Error('useAuthStore must be used within an AuthStoreProvider')
	}

	return useStore(authStoreContext, selector)
}
