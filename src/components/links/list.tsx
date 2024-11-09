import { useState, useEffect } from 'react';
import { LoaderIcon } from 'lucide-react';

import { LinkSchema } from '@/types';
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

	useEffect(() => {
		getLinks().then((data) => {
			setLoading(false);
			if (data) setLinks(data);
		});
	}, []);

	return (
		<div className='flex flex-col items-center justify-start w-full h-full overflow-scroll'>
			{loading ? (
				<LoaderIcon size={16} className='animate-spin' />
			) : (
				links.map((item) => LinkItem({ link: item }))
			)}
		</div>
	);
};

export default LinksList;
