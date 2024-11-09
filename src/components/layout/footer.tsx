import { cn } from '@/utils';
import React from 'react';
import ExternalLink from '@/ui/external-link';
import BetaWarning from '../beta-warning';

interface FooterProps {
	className?: string;
}

const Footer = (props: FooterProps) => {
	return (
		<footer
			className={cn(
				'px-5 text-sm text-neutral-600 animate-in fade-in-25 dark:text-neutral-400',
				'bg-white/60 backdrop-blur-md dark:bg-neutral-900/60',
				'rounded-t-md',
				props.className
			)}>
			<BetaWarning />
			<div className={cn('container flex items-center justify-between mt-2')}>
				<div className='flex items-center space-x-2'>
					<p className='space-x-1'>
						Made by{' '}
						<ExternalLink
							href='https://github.com/rguixaro'
							className='font-mono underline decoration-dotted underline-offset-4'>
							@rguixaro
						</ExternalLink>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
