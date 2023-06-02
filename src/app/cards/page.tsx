'use client'

import { useState } from 'react'
import Link from 'next/link'

import Pagination from '@/components/Pagination'

async function getCards(page: number = 1, pageSize: number = 250) {
	const res = await fetch(
		`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}`
	)
	return res.json()
}

async function CardsPage() {
	const [page, setPage] = useState(1)

	const cards = await getCards(page, 60)

	return (
		<div className="flex flex-col">
			<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10">
				{cards.data.map((card: any) => (
					<div
						key={card.id}
						className="hover:cursor-pointer hover:scale-110 duration-300"
					>
						<Link href={`/cards/${card.id}`}>
							<img src={card.images.small} alt={card.name} />
						</Link>
					</div>
				))}
			</div>
			<Pagination currPage={page} />
		</div>
	)
}

export default CardsPage
