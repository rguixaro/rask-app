import { format } from 'date-fns';
export const formatDate = (date: Date | string) => {
	if (typeof date === 'string') date = new Date(date);
	return format(date, 'dd MMMM, yyyy');
};

export const timeElapsed = (date: Date | string) => {
	if (typeof date === 'string') date = new Date(date);
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	return days === 0 ? 'Today' : `${days} days ago`;
};
