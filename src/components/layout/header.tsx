'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/utils';

import { Badge } from '@/ui/badge';
import ExternalLink from '@/ui/external-link';
import { Button, buttonVariants } from '@/ui/button';
import Logo from '@/components/icons/logo';
import { GithubLogo } from '@/components/icons/social';
import { ModeToggle } from '../switch-theme';

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/ui/dialog';
import LinksList from '../links/list';

const Header = () => {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<nav
			className={cn(
				'flex w-full min-h-20 justify-center',
				'lg:px-4',
				'sticky top-0 z-50',
				'bg-white dark:bg-neutral-900'
			)}>
			<div
				className={cn(
					'flex w-full px-5 items-center justify-between',
					'container'
				)}>
				<div className='flex items-center space-x-5'>
					<div className='flex items-center space-x-1 pr-1 md:pr-4'>
						<Link
							href='/'
							className='flex items-center space-x-3 transition-opacity hover:opacity-80 rtl:space-x-reverse'>
							<Logo width={30} />
							<span className='font-mono self-center whitespace-nowrap text-lg font-medium tracking-tight dark:text-white'>
								Rask
							</span>
							<Badge className='hidden cursor-pointer md:block'>
								beta
							</Badge>
						</Link>
					</div>
				</div>
				<div className='flex items-center space-x-5'>
					<Button
						variant='ghost'
						size='icon'
						className='w-auto px-3'
						onClick={() => setOpen(true)}>
						<span className='font-mono text-md tracking-tight text-neutral-800 dark:text-white'>
							URLs
						</span>
					</Button>
					<ModeToggle />
					<ExternalLink
						href='https://github.com/rguixaro/rask-app'
						className={buttonVariants({
							variant: 'ghost',
							size: 'icon',
						})}>
						<GithubLogo width={20} name='GitHub Repository' />
					</ExternalLink>
				</div>
			</div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader className='mb-2'>
						<DialogTitle>
							<p className='text-lg font-mono leading-none tracking-tight '>
								Your recent URLs
							</p>
							<p className='mt-3 text-gray-900 dark:text-white font-thin'>
								Here you can see all the links you have created
							</p>
						</DialogTitle>
					</DialogHeader>
					<LinksList />
				</DialogContent>
			</Dialog>
		</nav>
	);
};

export default Header;
