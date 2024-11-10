import { useState, useEffect } from 'react';
import { LoaderIcon } from 'lucide-react';

import { LinkSchema } from '@/types';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { TypographyP } from '@/ui/typography';
import { cn } from '@/utils';
import LinkItem from './item';

function getLinks(): Promise<LinkSchema[]> {
	return new Promise((resolve, reject) => {
		resolve([
			{
				id: 1,
				slug: 'rask.com/dphqwek12',
				url: 'https://portfolio.rguixaro.dev',
				visits: 10,
				created_at: '2024-09-01T00:00:00.000Z',
			},
			{
				id: 2,
				slug: 'rask.com/cadfqwev4',
				url: 'https://www.tecnoempleo.com/react-native-developer-hays/react-native-html-css/rf-562a122c22a6e379554e',
				created_at: '2024-09-02T00:00:00.000Z',
			},
			{
				id: 3,
				slug: 'rask.com/l7uiykj31',
				url: 'https://stackoverflow.com/questions/50739771/how-do-i-mock-a-promise-in-reactjs/50739868',
				visits: 5,
				created_at: '2024-09-03T00:00:00.000Z',
			},
			{
				id: 4,
				slug: 'rask.com/8qwek12',
				url: 'https://www.google.com',
				visits: 10,
				created_at: '2024-09-01T00:00:00.000Z',
			},
			{
				id: 5,
				slug: 'rask.com/8qwek12',
				url: 'https://www.google.com',
				visits: 10,
				created_at: '2024-09-01T00:00:00.000Z',
			},
			{
				id: 6,
				slug: 'rask.com/cadfcvasdv4',
				url: 'https://www.tecnoempleo.com/react-native-developer-hays/react-native-html-css/rf-562a122c22a6e379554e',
				created_at: '2024-09-02T00:00:00.000Z',
			},
		]);
	});
}

const LinksList = () => {
	const [loading, setLoading] = useState(true);
	const [links, setLinks] = useState<LinkSchema[]>([]);

	const { copy } = useCopyToClipboard();

	useEffect(() => {
		getLinks().then((data) => {
			setLoading(false);
			if (data) setLinks(data);
		});
	}, []);

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
			{links.length && links.map((item) => LinkItem({ link: item, copy }))}
		</div>
	);
};

export default LinksList;
