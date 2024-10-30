import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';

import { ThemeProvider } from '@/components/providers/theme-provider';
import Header from '@/components/header';
import { cn } from '@/utils';

const interVariable = localFont({
	variable: '--font-sans',
	src: '../fonts/InterVariable.woff2',
	weight: '100 900',
	display: 'swap',
	preload: true,
});

const geistMonoVariable = localFont({
	variable: '--font-geist-mono',
	src: '../fonts/GeistMonoVF.woff2',
	weight: '100 900',
	display: 'swap',
	preload: true,
});

export const metadata: Metadata = {
	title: 'Rask',
	description: 'An open-source URL shortener',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={cn(
					`font-sans ${interVariable.variable} ${geistMonoVariable.variable} antialiased`,
					'bg-white dark:bg-neutral-900',
					'selection:bg-neutral-200 dark:selection:bg-neutral-700'
				)}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange>
					<Header />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
