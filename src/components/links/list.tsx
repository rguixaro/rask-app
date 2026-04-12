import { useState, useEffect } from 'react'
import { LoaderIcon } from 'lucide-react'
import { toast } from 'sonner'

import { getLinksList } from '@/services/api'
import { useAuthStore } from '@/providers/auth-store-provider'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { TypographyP } from '@/ui/typography'
import { LinkSchema } from '@/types'
import { MESSAGES } from '@/utils/messages'
import { cn } from '@/utils'
import LinkItem from './item'

interface LinksListProps {
	open: boolean
}

const LinksList = ({ open }: LinksListProps) => {
	const [loading, setLoading] = useState(false)
	const [links, setLinks] = useState<LinkSchema[]>([])

	const { isAuthenticated } = useAuthStore((state) => state)
	const { copy } = useCopyToClipboard()

	useEffect(() => {
		if (!open || !isAuthenticated) return

		let active = true

		Promise.resolve()
			.then(() => {
				if (active) setLoading(true)
				return getLinksList()
			})
			.then(({ error, links }) => {
				if (!active) return
				if (error) toast.error(MESSAGES.ERROR)
				else if (links) setLinks(links)
				setLoading(false)
			})
			.catch(() => {
				if (!active) return
				toast.error(MESSAGES.ERROR)
				setLoading(false)
			})

		return () => {
			active = false
		}
	}, [open, isAuthenticated])

	return (
		<div
			className={cn(
				'flex flex-col items-start justify-start w-full h-full overflow-y-scroll',
				'scrollbar-thin scrollbar-track-forest-500/30 scrollbar-thumb-forest-500/50',
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
				links.map((item) => (
					<LinkItem key={item.slug} link={item} copy={copy} />
				))
			)}
		</div>
	)
}

export default LinksList
