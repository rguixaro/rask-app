import { LinkSchema } from '@/types';
import { Button } from '@/ui/button';
import { cn } from '@/utils';
import { timeElapsed } from '@/utils/formatDate';
import { ClipboardIcon, SquareArrowOutUpRight } from 'lucide-react';

const LinkItem = ({ link }: { link: LinkSchema }) => {
	return (
		<div
			key={link.id}
			className={cn(
				'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800',
				'p-4 my-3 rounded-lg w-3/4',
				'text-xs text-neutral-900 dark:text-white'
			)}>
			<div className='flex justify-between'>
				<b className='text-md'>{link.slug}</b>
				{link.visits && <span>{link.visits + ' visits'}</span>}
			</div>

			<p className='text-forest-500 dark:text-neutral-300'>{link.url}</p>
			<div className='mt-2'>
				<span>{timeElapsed(link.created_at) + ' days ago'}</span>
			</div>
			<div className='mt-2 space-x-2'>
				<Button variant='secondary' size='sm'>
					<div className='flex items-center space-x-1'>
						<SquareArrowOutUpRight size={12} />
						<span>Visit</span>
					</div>
				</Button>
				<Button variant='secondary' size='sm'>
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
