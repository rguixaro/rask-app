import Link from 'next/link';
import { cn } from '@/utils';

import { Badge } from '@/ui/badge';
import ExternalLink from '@/ui/external-link';
import { buttonVariants } from '@/ui/button';
import Logo from '@/components/icons/logo';
import { GithubLogo } from '@/components/icons/social';
import { ModeToggle } from '../switch-theme';

const Header = () => {
	return (
		<nav
			className={cn(
				'flex w-full justify-center',
				'py-5 lg:px-4',
				'sticky top-0 z-50',
				'bg-white dark:bg-neutral-900'
			)}>
			<div
				className={cn(
					'flex w-full px-5 items-center justify-between',
					'container'
				)}>
				<div className='flex items-center space-x-5'>
					<div className='flex items-center space-x-1 pr-1 md:pr-4'>
						<Link
							href='/'
							className='flex items-center space-x-3 transition-opacity hover:opacity-80 rtl:space-x-reverse'>
							<Logo width={30} />
							<span className='font-mono self-center whitespace-nowrap text-lg font-medium tracking-tight dark:text-white'>
								Rask
							</span>
							<Badge className='hidden cursor-pointer md:block'>
								beta
							</Badge>
						</Link>
					</div>
				</div>
				<div className='flex items-center space-x-5'>
					<ExternalLink
						href='https://github.com/rguixaro/rask-app'
						className={buttonVariants({
							variant: 'ghost',
							size: 'icon',
						})}>
						<GithubLogo width={20} name='GitHub Repository' />
					</ExternalLink>
					<ModeToggle />
				</div>
			</div>
		</nav>
	);
};

export default Header;
