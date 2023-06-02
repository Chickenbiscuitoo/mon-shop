import Link from 'next/link'

async function getCards() {
	const res = await fetch(
		`https://api.pokemontcg.io/v2/cards?page=1&pageSize=250`
	)
	return res.json()
}

async function CardsPage() {
	const cards = await getCards()

	return (
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
	)
}

export default CardsPage
