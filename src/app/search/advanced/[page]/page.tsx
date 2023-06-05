import Link from 'next/link'

import { Silkscreen } from 'next/font/google'

import Pagination from '@/components/Pagination'

type Params = {
	params: {
		page: string
	}
	searchParams: {
		name?: string
		superTypes?: string[]
		subTypes?: string[]
		types?: string[]
		hp?: {
			min: number
			max: number
		}
		weaknesses?: string[]
		resistances?: string[]
		retreatCost?: {
			min: number
			max: number
		}
		sets?: string[]
		series?: string[]
		legalities?: {
			standard: 'legal' | 'banned'
			expanded: 'legal' | 'banned'
			unlimited: 'legal' | 'banned'
		}
		pokedexNumber?: {
			min: number
			max: number
		}
		artist?: string
		rarity?: string
	}
}

const silkscreen = Silkscreen({ subsets: ['latin'], weight: '400' })

async function getSearched(
	page: number = 1,
	pageSize: number = 250,
	name?: string,
	rarity?: string
) {
	if (name) {
		const res = await fetch(
			`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}&q=name:${name}*`
		)
		return res.json()
	} else if (rarity) {
		const res = await fetch(
			`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}&q=!rarity:"${rarity}"`
		)
		return res.json()
	}
}

async function SearchPage({
	params: { page },
	searchParams: { name, rarity },
}: Params) {
	const cards = await getSearched(Number(page), 60, name, rarity)

	return (
		<>
			{cards?.count > 0 ? (
				<div className="flex flex-col">
					<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10">
						{cards.data.map((card: any) => (
							<div
								key={card.id}
								className="hover:cursor-pointer hover:scale-110 duration-300"
							>
								<Link href={`/card/${card.id}`}>
									<img
										src={card.images.small}
										alt={card.name}
									/>
								</Link>
							</div>
						))}
					</div>
					<Pagination
						currPage={Number(page)}
						route="/advanced"
						queryParams={`?name=${name}`}
					/>
				</div>
			) : (
				<div className="flex flex-col place-content-center place-items-center place-self-center w-full gap-2 m-2">
					<div className={silkscreen.className}>
						<h1 className="text-5xl font-bold text-[#315a7b] drop-shadow-[0_1.2px_1.2px_rgba(82, 140, 173, 1)]">
							No cards found
						</h1>
					</div>
					<img
						src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmM2NzFkMGZlZGM3N2IwZmQyZDQ4Yjc2OGE0YTc3NGRhMDY0MzZmZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/n2ytlxNQLodGM/giphy.gif"
						alt="snorlax"
						width="300"
						height="300"
					/>
				</div>
			)}
		</>
	)
}

export default SearchPage
