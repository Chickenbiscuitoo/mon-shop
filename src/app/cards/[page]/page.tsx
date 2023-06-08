import Link from 'next/link'

import { Silkscreen } from 'next/font/google'

import Pagination from '@/components/Pagination'

type Params = {
	params: {
		page: string
	}
}

const silkscreen = Silkscreen({ subsets: ['latin'], weight: '400' })

async function getCards(page: number = 1, pageSize: number = 250) {
	const res = await fetch(
		`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}`
	)
	return res.json()
}

async function CardsPage({ params: { page } }: Params) {
	const cards = await getCards(Number(page), 60)

	if (!cards || cards?.count < 1) {
		return (
			<div className="flex flex-col place-content-center place-items-center place-self-center w-full gap-2 m-2">
				<div className={silkscreen.className}>
					<h1 className="text-5xl font-bold text-[#315a7b] drop-shadow-[0_1.2px_1.2px_rgba(82, 140, 173, 1)]">
						No more cards to show
					</h1>
				</div>
				<img
					src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmM2NzFkMGZlZGM3N2IwZmQyZDQ4Yjc2OGE0YTc3NGRhMDY0MzZmZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/n2ytlxNQLodGM/giphy.gif"
					alt="snorlax"
					width="300"
					height="300"
				/>

				<div className="shape-blob fixed -z-50 bg-primary"></div>
				<div className="shape-blob one fixed -z-50 bg-primary"></div>
				<div className="shape-blob two fixed -z-50 bg-primary"></div>
				<div className="shape-blob three fixed -z-50 bg-primary"></div>
			</div>
		)
	}

	return (
		<div className="flex flex-col">
			<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10">
				{cards.data.map((card: any) => (
					<div
						key={card.id}
						className="hover:cursor-pointer hover:scale-110 duration-300"
					>
						<Link href={`/card/${card.id}`}>
							<img src={card.images.small} alt={card.name} />
						</Link>
					</div>
				))}
			</div>
			<Pagination currPage={Number(page)} route="/cards" />

			<div className="shape-blob fixed -z-50 bg-primary"></div>
			<div className="shape-blob one fixed -z-50 bg-primary"></div>
			<div className="shape-blob two fixed -z-50 bg-primary"></div>
			<div className="shape-blob three fixed -z-50 bg-primary"></div>
		</div>
	)
}

export default CardsPage
