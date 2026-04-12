import Alert from '@/ui/alert'
import { cn } from '@/utils'
import Link from 'next/link'

const BetaWarning = () => {
	return (
		<Alert
			variant='info'
			className={cn(
				'shadow-sm text-neutral-600 animate-in fade-in-25 dark:text-neutral-400',
				'bg-white/60 backdrop-blur-md dark:bg-neutral-900/60',
			)}
			containerClassName='container'
			iconSize={12}>
			<p className='text-sm md:text-base'>
				<b>Rask</b> is currently in its <b>beta version</b>. If you detect
				any problem or bug, feel free to{' '}
				<Link
					href='https://github.com/rguixaro/rask-app/issues/new/choose'
					className='underline decoration-dotted underline-offset-4'>
					create an issue
				</Link>
				on Github.
			</p>
		</Alert>
	)
}

export default BetaWarning
