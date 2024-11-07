'use client';

import Footer from '@/components/layout/footer';
import { Button } from '@/ui/button';
import {
	TypographyH2,
	TypographyH3,
	TypographyH4,
	TypographyP,
} from '@/ui/typography';
import { LoaderIcon, RocketIcon, ShuffleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Input, Textarea } from '@/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/ui/form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { CreateLinkSchema } from '@/types';
import { ReactNode, useState } from 'react';
import JSConfetti from 'js-confetti';
import Alert from '@/ui/alert';

interface CreateLinkProps {
	children: ReactNode;
	slug?: string;
}

export default function Home(props: CreateLinkProps) {
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const [isError, setError] = useState<boolean>(false);

	const form = useForm<z.infer<typeof CreateLinkSchema>>({
		resolver: zodResolver(CreateLinkSchema),
		defaultValues: {
			url: '',
			slug: props.slug ?? '',
		},
	});

	function createLink(values: z.infer<typeof CreateLinkSchema>) {
		console.log('createLink', values);
		return { error: false, limit: false };
	}

	// Form Submit method:
	const onSubmit = async (values: z.infer<typeof CreateLinkSchema>) => {
		// Check if slug & url are equals to prevent infinite redirect =>
		if (values.slug === values.url) {
			setLoading(false);
			setError(true);
			setMessage('The URL and the slug cannot be the same');
			return;
		}

		try {
			setLoading(true);

			/* const slugExists = await checkIfSlugExist(values.slug);
			if (slugExists) {
				toast.error(
					'The slug is already exist. Write another or generate a random slug.'
				);
				return;
			} */

			const result = await createLink(values);

			if (result.error && result.limit) {
				toast.info(result.error);
				return;
			}

			toast.success('Link created successfully', {
				description: `Url: https://slug.vercel.app/${values.slug}`,
				duration: 10000,
				closeButton: true,
			});

			form.reset();
			await generateConfetti();
		} catch (error) {
			toast.error('An unexpected error has occurred. Please try again later.');
		} finally {
			setError(false);
			setMessage('');
			setLoading(false);
		}
	};

	// Generate confetti animation:
	const generateConfetti = async () => {
		const jsConfetti = new JSConfetti();
		await jsConfetti.addConfetti({
			confettiColors: ['#fdd835', '#4caf50', '#2196f3', '#f44336', '#ff9800'],
			confettiRadius: 3,
			confettiNumber: 50,
		});
	};

	const handleGenerateRandomSlug = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const randomSlug = Math.random().toString(36).substring(7);
		form.setValue('slug', randomSlug);
	};

	/* h-[calc(100vh-4rem)] */
	return (
		<main className='h-[calc(100vh-5rem)]'>
			<div className='absolute inset-0 -z-10 h-full w-full bg-forest-500 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-forest-500'></div>
			<section className='flex flex-col items-center px-6 text-center'>
				<TypographyH2 className='font-mono text-white max-w-[75ch] duration-500 animate-in fade-in-5 slide-in-from-bottom-2'>
					Enhance Your Link Management
				</TypographyH2>
				<TypographyP className='max-w-[75ch] text-white text-sm duration-700 animate-in fade-in-5 slide-in-from-top-2 md:text-base lg:text-lg xl:text-xl'>
					<b>Rask</b> is an open-source platform that allows you to create,
					manage, and share short links with ease. It's fast, secure, and
					easy to use.
				</TypographyP>
				<div className='bg-white/60 backdrop-blur-md dark:bg-neutral-900/60 rounded-2xl p-2 w-4/5 md:w-1/2 lg:w-1/3 mt-4 sm:mt-8 items-center justify-center gap-x-3 space-y-3 duration-700 animate-in fade-in-30 sm:flex sm:space-y-0 '>
					<div className='p-5 rounded-xl bg-white flex-grow dark:bg-neutral-900 flex flex-col items-start justify-start'>
						<TypographyH4 className='font-mono max-w-[75ch] duration-500 animate-in fade-in-5 slide-in-from-bottom-2 text-neutral-900 dark:text-white'>
							Shorten a long link
						</TypographyH4>
						<TypographyP className='max-w-[75ch] mb-5 duration-500 animate-in fade-in-5 slide-in-from-bottom-2 text-neutral-900 dark:text-white text-left'>
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
													<FormLabel className='font-mono text-md lg:text-lg'>
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
													<FormLabel className='font-mono text-md lg:text-lg'>
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
			<Footer className='bottom-0 sm:left-1/4 sm:right-1/4 fixed mt-4 pt-4 pb-3' />
		</main>
	);
}
