import Link from 'next/link'

import Pagination from '@/components/Pagination'

type Params = {
	params: {
		page: string
	}
	searchParams: {
		name: string
	}
}

async function getSearched(
	page: number = 1,
	pageSize: number = 250,
	name: string
) {
	const res = await fetch(
		`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}&q=name:${name}*`
	)
	return res.json()
}

async function SearchPage({
	params: { page },
	searchParams: { name },
}: Params) {
	const cards = await getSearched(Number(page), 60, name)

	return (
		<>
			{cards.count > 0 ? (
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
						route="/search"
						queryParams={`?name=${name}`}
					/>
				</div>
			) : (
				<div className="flex flex-col place-content-center place-items-center place-self-center w-full gap-2 m-2">
					<h1 className="text-2xl font-bold text-[#5098a8]">
						No more cards to show
					</h1>
					<img
						src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTdlMDg5NThhNjhkODYwMmRmY2MzOWUxZmE2M2NjZGUxMGZhYmY1MCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/11nEYzFwkwDWuc/giphy.gif"
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
