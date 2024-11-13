'use client';

import { toast } from 'sonner';
import { ClipboardIcon, SquareArrowOutUpRight } from 'lucide-react';

import { LinkSchema } from '@/types';
import { Button } from '@/ui/button';
import { cn } from '@/utils';
import { timeElapsed } from '@/utils/formatDate';

interface LinkItemProps {
	link: LinkSchema;
	copy: (text: string) => Promise<boolean>;
}

const LinkItem = ({ link, copy }: LinkItemProps) => {
	const handleCopy = (text: string) => () => {
		copy(text)
			.then(() =>
				toast.success('Link copied to clipboard', {
					description: `${text}`,
				})
			)
			.catch((error) =>
				toast.error(
					'An unexpected error has occurred. Please try again later.',
					{ description: error }
				)
			);
	};

	const handleVisit = () => {
		window.open(link.slug, '_blank');
	};

	return (
		<div
			key={`key-id-${link.slug}`}
			className={cn(
				'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800',
				'p-4 my-3 rounded-lg w-[90%]',
				'md:text-lg text-neutral-900 dark:text-white'
			)}>
			<div className='flex justify-between'>
				<span className='font-mono mb-1'>{link.slug}</span>
				{(link.visits ?? 0) > 0 && (
					<span className='text-sm'>{link.visits + ' visits'}</span>
				)}
			</div>
			<p className='text-forest-500 dark:text-neutral-300 text-xs md:text-base'>
				{link.url}
			</p>
			<div className='mt-2 text-sm md:text-base'>
				<span>{timeElapsed(link.created_at)}</span>
			</div>
			<div className='mt-2 space-x-2'>
				<Button variant='secondary' size='sm' onClick={handleVisit}>
					<div className='flex items-center space-x-1'>
						<SquareArrowOutUpRight size={12} />
						<span>Visit</span>
					</div>
				</Button>
				<Button
					variant='secondary'
					size='sm'
					onClick={handleCopy(link.slug)}>
					<div className='flex items-center space-x-1'>
						<ClipboardIcon size={12} />
						<span>Copy</span>
					</div>
				</Button>
			</div>
		</div>
	);
};

export default LinkItem;
