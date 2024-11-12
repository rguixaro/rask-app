import { createStore } from 'zustand';

export type AuthState = {
	isAuthenticated: boolean;
};

export type AuthActions = {
	login: () => void;
	logout: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
	isAuthenticated: false,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
	return createStore<AuthStore>((set) => ({
		/* State */
		...initState,
		/* Actions */
		login: () => set(() => ({ isAuthenticated: true })),
		logout: () => set(() => ({ isAuthenticated: false })),
	}));
};
