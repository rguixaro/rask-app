import ExternalLink from '@/ui/external-link';
import { cn } from '@/utils';
import React from 'react';
import { T3Logo, XLogo } from './icons/social';
import { ArrowUpRight, Heart } from 'lucide-react';

interface FooterProps {
	className?: string;
}

const Footer = (props: FooterProps) => {
	return (
		<footer
			className={cn(
				'group w-full px-5 text-sm text-neutral-600 animate-in fade-in-25 dark:text-neutral-400',
				'bg-white/60 backdrop-blur-md dark:bg-neutral-900/60',
				props.className
			)}>
			<div className={cn('container flex items-center justify-between')}>
				<div className='flex items-center space-x-2'>
					<p className='space-x-1'>
						Made by <b>@rguixaro</b>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
