'use client';

import { useCallback, useEffect, useState } from 'react';
import { LoaderIcon, RocketIcon, ShuffleIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import JSConfetti from 'js-confetti';

import { authenticate, createLink } from '@/services/api';
import { useAuthStore } from '@/providers/auth-store-provider';
import Footer from '@/components/layout/footer';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { TypographyH3, TypographyH4, TypographyP } from '@/ui/typography';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/ui/form';
import Alert from '@/ui/alert';
import { CreateLinkSchema } from '@/types';
import { cn } from '@/utils';
import { MESSAGES } from '@/utils/messages';

export default function Home() {
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const [isError, setError] = useState<boolean>(false);
	const [isRandomized, setIsRandomized] = useState<boolean>(false);

	const { isAuthenticated, login } = useAuthStore((state) => state);

	const form = useForm<z.infer<typeof CreateLinkSchema>>({
		resolver: zodResolver(CreateLinkSchema),
		defaultValues: { url: '', slug: '', randomized: false },
	});

	/** Authentication handler */
	const handleAuth = useCallback(async () => {
		try {
			const { error } = await authenticate();
			if (error) {
				toast.error(MESSAGES.ERROR);
				return;
			}
			login();
		} catch (error) {
			toast.error(MESSAGES.ERROR);
		}
	}, []);

	/** Effect to check if the user is authenticated */
	useEffect(() => {
		if (!isAuthenticated) handleAuth();
	}, [isAuthenticated, handleAuth]);

	/**
	 * onSubmit form handler
	 * @param values
	 */
	const onSubmit = async (values: z.infer<typeof CreateLinkSchema>) => {
		/** Check if the slug and the url are the same */
		if (values.slug === values.url) {
			setLoading(false);
			setError(true);
			setMessage(MESSAGES.SAME_SLUG_URL);
			return;
		}
		try {
			setLoading(true);
			const { error, message, slug } = await createLink(values);
			if (error) {
				toast.error(
					message
						? Object.keys(MESSAGES).includes(message)
							? MESSAGES[message as keyof typeof MESSAGES]
							: MESSAGES.ERROR
						: MESSAGES.ERROR
				);
				return;
			}

			toast.success(MESSAGES.LINK_CREATED, {
				description: `https://rask.rguixaro.dev/${slug}`,
				duration: 10000,
			});
			form.reset();
			if (values.randomized) form.setValue('randomized', isRandomized);
			await generateConfetti();
		} catch (error) {
			toast.error(MESSAGES.ERROR);
		} finally {
			setError(false);
			setMessage('');
			setLoading(false);
		}
	};

	/** Generate confetti animation */
	const generateConfetti = async () => {
		const jsConfetti = new JSConfetti();
		await jsConfetti.addConfetti({
			confettiColors: [
				'#a6bbb9',
				'#789B84',
				'#5A8470',
				'#3D6C5F',
				'#205550',
				'#1B464B',
			],
			confettiRadius: 3,
			confettiNumber: 50,
		});
	};

	/**
	 * Randomize slug handler
	 * @param e
	 */
	const handleRandomize = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		form.setValue('randomized', !isRandomized);
		form.setValue('slug', '');
		setIsRandomized(!isRandomized);
	};

	return (
		<main
			className={cn(
				'bg-forest-500 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-forest-500',
				'h-[calc(100vh-5rem)] min-h-[730px] flex flex-col justify-between items-center'
			)}>
			<section className='flex flex-col items-center px-6 text-center'>
				<TypographyH3 className='flex font-mono text-white max-w-[75ch] duration-500 animate-in fade-in-5 slide-in-from-bottom-2'>
					Enhance Your Link Management
				</TypographyH3>
				<TypographyP className='max-w-[75ch] text-white text-sm duration-700 animate-in fade-in-5 slide-in-from-top-2 md:text-base lg:text-lg xl:text-xl'>
					<b>Rask</b>
					{` is an open-source platform that allows you to create,
					manage, and share short links with ease. It's fast, secure, and
					easy to use.`}
				</TypographyP>
				<div className='bg-white/60 backdrop-blur-md dark:bg-neutral-900/60 rounded-2xl p-2 py-5 w-11/12 md:w-1/2 lg:w-5/12 mt-4 sm:mt-8 items-center justify-center gap-x-3 space-y-3 duration-700 animate-in fade-in-30 sm:flex sm:space-y-0 '>
					<div className='p-8 rounded-xl bg-white flex-grow dark:bg-neutral-900 flex flex-col items-start justify-start'>
						<TypographyH4 className='font-mono max-w-[75ch] duration-500 animate-in fade-in-5 slide-in-from-bottom-2 text-neutral-800 dark:text-white'>
							Shorten a long link
						</TypographyH4>
						<TypographyP className='max-w-[75ch] mb-5 duration-500 animate-in fade-in-5 slide-in-from-bottom-2 text-neutral-800 dark:text-white text-left text-base sm:text-lg'>
							You can create up to 10 short links/month
						</TypographyP>
						<div className='w-full'>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className='space-y-6 w-full'>
									<div className='space-y-5'>
										<FormField
											control={form.control}
											name='url'
											render={({ field }) => (
												<FormItem className='text-left'>
													<FormLabel className='font-mono text-base md:text-xl text-neutral-800 dark:text-white'>
														Paste your long link here
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															autoComplete='off'
															placeholder='https://example.com/my-long-url'
															disabled={loading}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='slug'
											render={({ field }) => (
												<FormItem className='text-left'>
													<FormLabel className='font-mono text-base md:text-xl text-neutral-800 dark:text-white'>
														Customize your link
													</FormLabel>
													<FormControl>
														<div className='relative flex items-center h-9'>
															<Input
																{...field}
																placeholder='Link'
																className={cn(
																	'w-1/2 transition-opacity duration-500 rounded-br-none rounded-tr-none',
																	`${isRandomized ? 'opacity-0' : 'opacity-100'}`
																)}
																disabled={loading}
															/>
															<Button
																onClick={
																	handleRandomize
																}
																variant='outline'
																className={cn(
																	'w-1/2 absolute right-0 rounded-none rounded-br-md rounded-tr-md duration-500 transition-all',
																	`${isRandomized ? 'w-full rounded-md bg-forest-100 hover:bg-forest-600/50 dark:bg-forest-700 hover:dark:bg-forest-700/50  text-white' : 'hover:bg-forest-100/50 hover:dark:bg-forest-700/50 '}`
																)}>
																<ShuffleIcon
																	size={14}
																	className={cn(
																		`transition-opacity duration-500`,
																		`${isRandomized ? 'opacity-100' : 'opacity-0'}`
																	)}
																/>
																<span className='font-mono text-xs sm:text-sm md:text-base pr-[14px]'>
																	Randomize
																</span>
															</Button>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										{isError && (
											<Alert variant='error'>{message}</Alert>
										)}
									</div>
									<Button type='submit' disabled={loading}>
										<div className='flex space-x-3 items-center mr-[16px] px-5 sm:px-10'>
											{loading ? (
												<LoaderIcon
													size={16}
													className='animate-spin'
												/>
											) : (
												<RocketIcon className='h-5 sm:h-8' />
											)}
											<span className='font-mono sm:text-base'>
												{loading ? 'Creating...' : 'Create'}
											</span>
										</div>
									</Button>
								</form>
							</Form>
						</div>
					</div>
				</div>
			</section>
			<Footer className='sm:w-1/2 mt-4 pt-4 pb-3' />
		</main>
	);
}
