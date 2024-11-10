'use client';

import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

export const ToasterComponent = () => {
	const { theme } = useTheme();
	return (
		<Toaster
			position='bottom-right'
			theme={theme === 'dark' ? 'dark' : 'light'}
			toastOptions={{
				classNames: {
					toast: 'font-sans dark:bg-forest-700 bg-forest-100 border-neutral-100 dark:border-neutral-800',
					description: 'font-mono',
				},
			}}
		/>
	);
};
