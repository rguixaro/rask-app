import Alert from '@/ui/alert';
import ExternalLink from '@/ui/external-link';
import { cn } from '@/utils';

const BetaWarning = () => {
	return (
		<Alert
			variant='info'
			className={cn(
				'shadow-sm text-neutral-600 animate-in fade-in-25 dark:text-neutral-400',
				'bg-white/60 backdrop-blur-md dark:bg-neutral-900/60'
			)}
			containerClassName='container'
			iconSize={12}>
			<p>
				<b>Rask</b> is currently in its <b>beta version</b>. If you detect
				any problem or bug, feel free to{' '}
				<ExternalLink
					href='https://github.com/rguixaro/rask-app/issues/new/choose'
					className='underline decoration-dotted underline-offset-4'>
					create an issue
				</ExternalLink>{' '}
				on Github.
			</p>
		</Alert>
	);
};

export default BetaWarning;
