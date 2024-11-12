'use client';

import { ReactNode, useEffect, useState } from 'react';
import { LoaderIcon, RocketIcon, ShuffleIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import JSConfetti from 'js-confetti';

import { authenticate, checkIfLinkExists, createLink } from '@/services/api';
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

interface CreateLinkProps {
	children: ReactNode;
	slug?: string;
}

export default function Home(props: CreateLinkProps) {
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const [isError, setError] = useState<boolean>(false);

	const { isAuthenticated, login } = useAuthStore((state) => state);

	const form = useForm<z.infer<typeof CreateLinkSchema>>({
		resolver: zodResolver(CreateLinkSchema),
		defaultValues: { url: '', slug: props.slug ?? '' },
	});

	/** Effect to check if the user is authenticated */
	useEffect(() => {
		if (!isAuthenticated) handleAuth();
	}, [isAuthenticated]);

	/** Authentication handler */
	async function handleAuth() {
		try {
			const { error, message } = await authenticate();
			if (error) {
				toast.error(MESSAGES.ERROR);
				return;
			}
			login();
		} catch (error) {
			toast.error(MESSAGES.ERROR);
		}
	}

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
			const { error: errorCheck, message: messageCheck } =
				await checkIfLinkExists(values.slug);
			if (errorCheck) {
				toast.error(messageCheck || MESSAGES.ERROR);
				return;
			}

			const { error: errorCreate, message: messageCreate } =
				await createLink(values);
			if (errorCreate) {
				toast.error(messageCreate || MESSAGES.ERROR);
				return;
			}

			toast.success(MESSAGES.LINK_CREATED, {
				description: `Url: https://slug.vercel.app/${values.slug}`,
				duration: 10000,
				closeButton: true,
			});
			form.reset();
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
	 * Generate random slug
	 * @param e
	 */
	const handleGenerateRandomSlug = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const randomSlug = Math.random().toString(36).substring(7);
		form.setValue('slug', randomSlug);
	};

	return (
		<main
			className={cn(
				'bg-forest-500 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-forest-500',
				'h-[calc(100vh-5rem)] min-h-[730px] flex flex-col justify-between items-center'
			)}>
			<section className='flex flex-col items-center px-6 text-center'>
				<TypographyH3 className='flex  font-mono text-white max-w-[75ch] duration-500 animate-in fade-in-5 slide-in-from-bottom-2'>
					Enhance Your Link Management
				</TypographyH3>
				<TypographyP className='max-w-[75ch] text-white text-sm duration-700 animate-in fade-in-5 slide-in-from-top-2 md:text-base lg:text-lg xl:text-xl'>
					<b>Rask</b> is an open-source platform that allows you to create,
					manage, and share short links with ease. It's fast, secure, and
					easy to use.
				</TypographyP>
				<div className='bg-white/60 backdrop-blur-md dark:bg-neutral-900/60 rounded-2xl p-2 w-4/5 md:w-1/2 lg:w-1/3 mt-4 sm:mt-8 items-center justify-center gap-x-3 space-y-3 duration-700 animate-in fade-in-30 sm:flex sm:space-y-0 '>
					<div className='p-5 rounded-xl bg-white flex-grow dark:bg-neutral-900 flex flex-col items-start justify-start'>
						<TypographyH4 className='font-mono max-w-[75ch] duration-500 animate-in fade-in-5 slide-in-from-bottom-2 text-neutral-800 dark:text-white'>
							Shorten a long link
						</TypographyH4>
						<TypographyP className='max-w-[75ch] mb-5 duration-500 animate-in fade-in-5 slide-in-from-bottom-2 text-neutral-800 dark:text-white text-left'>
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
													<FormLabel className='font-mono text-md lg:text-lg text-neutral-800 dark:text-white'>
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
													<FormLabel className='font-mono text-md lg:text-lg text-neutral-800 dark:text-white'>
														Customize your link
													</FormLabel>
													<FormControl>
														<div className='relative flex items-center'>
															<Input
																{...field}
																placeholder='mylink'
																disabled={loading}
															/>
															<Button
																onClick={
																	handleGenerateRandomSlug
																}
																variant='outline'
																className='absolute right-0 rounded-none rounded-br-md rounded-tr-md '>
																<ShuffleIcon
																	size={14}
																/>
																<span>
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
										<div className='flex space-x-3 items-center mr-[16px] px-5'>
											{loading ? (
												<LoaderIcon
													size={16}
													className='animate-spin'
												/>
											) : (
												<RocketIcon size={16} />
											)}
											<span>
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
