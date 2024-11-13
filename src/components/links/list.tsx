import { useState, useEffect } from 'react';
import { LoaderIcon } from 'lucide-react';
import { toast } from 'sonner';

import { getLinksList } from '@/services/api';
import { useAuthStore } from '@/providers/auth-store-provider';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { TypographyP } from '@/ui/typography';
import { LinkSchema } from '@/types';
import { MESSAGES } from '@/utils/messages';
import { cn } from '@/utils';
import LinkItem from './item';

const LinksList = () => {
	const [loading, setLoading] = useState(true);
	const [links, setLinks] = useState<LinkSchema[]>([]);

	const { isAuthenticated } = useAuthStore((state) => state);
	const { copy } = useCopyToClipboard();

	useEffect(() => {
		if (!isAuthenticated) return;
		getLinksList()
			.then(({ error, message, links }) => {
				if (error) toast.error(MESSAGES.ERROR);
				else if (links) setLinks(links);
				setLoading(false);
			})
			.catch(() => {
				toast.error(MESSAGES.ERROR);
				setLoading(false);
			});
	}, [isAuthenticated]);

	return (
		<div
			className={cn(
				'flex flex-col items-start justify-start w-full h-full overflow-y-scroll',
				'scrollbar-thin scrollbar-track-forest-500/30 scrollbar-thumb-forest-500/50'
			)}>
			{loading && (
				<div className='self-center flex flex-col items-center '>
					<LoaderIcon size={16} className='animate-spin text-forest-500' />
					<TypographyP className='font-mono'>Loading...</TypographyP>
				</div>
			)}
			{links.length === 0 && !loading ? (
				<TypographyP className='font-mono self-center'>
					No recent URLs in your history!
				</TypographyP>
			) : (
				links.map((item) => LinkItem({ link: item, copy }))
			)}
		</div>
	);
};

export default LinksList;
