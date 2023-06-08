import Link from 'next/link'
import Image from 'next/image'

type Params = {
	params: {
		setId: string
	}
}

async function getSet(setId: string) {
	const res = await fetch(
		`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`
	)
	return res.json()
}

async function SetPage({ params: { setId } }: Params) {
	const set = await getSet(setId)

	return (
		<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10">
			{set.data.map((card: any) => (
				<div
					key={card.id}
					className="hover:cursor-pointer hover:scale-110 duration-300"
				>
					<Link href={`/card/${card.id}`}>
						<Image
							src={card.images.small}
							alt={card.name}
							width={245}
							height={342}
							priority={true}
						/>
					</Link>
				</div>
			))}
		</div>
	)
}

export default SetPage
