import Link from 'next/link'

import getRandomInteger from '../../utils/getRandomInteger'

async function getCards(num: number) {
	const randomPage = getRandomInteger(1, 250)

	const res = await fetch(
		`https://api.pokemontcg.io/v2/cards?page=${randomPage}&pageSize=${num}&q=supertype:pokemon`
	)
	return res.json()
}

async function CardsDisplay() {
	const cards = await getCards(5)

	return (
		<div className="flex place-items-center place-content-center h-full transform translate-y-1/2">
			<Link href={`/card/${cards.data[0].id}`} className="">
				<div className="relative z-20 object-contain transition duration-300 ease-in-out transform hover:-translate-y-2">
					<img
						className="drop-shadow-xl"
						src={
							cards.data[0].images.small ||
							'https://via.placeholder.com/245x342'
						}
						alt="Image 1"
						width={240}
					/>
				</div>
			</Link>
			<Link href={`/card/${cards.data[1].id}`}>
				<div className="relative z-10 -ml-20 -mt-44 object-contain transition duration-300 ease-in-out transform hover:-translate-y-2">
					<img
						className="drop-shadow-xl"
						src={
							cards.data[1].images.small ||
							'https://via.placeholder.com/245x342'
						}
						alt="Image 2"
						width={240}
					/>
				</div>
			</Link>
			<Link href={`/card/${cards.data[2].id}`}>
				<div className="relative z-20 -ml-20 -mt-20 object-contain transition duration-300 ease-in-out transform hover:-translate-y-2">
					<img
						className="drop-shadow-xl"
						src={
							cards.data[2].images.small ||
							'https://via.placeholder.com/245x342'
						}
						alt="Image 3"
						width={240}
					/>
				</div>
			</Link>
			<Link href={`/card/${cards.data[3].id}`}>
				<div className="relative z-10 -ml-20 -mt-44 object-contain transition duration-300 ease-in-out transform hover:-translate-y-2">
					<img
						className="drop-shadow-xl"
						src={
							cards.data[3].images.small ||
							'https://via.placeholder.com/245x342'
						}
						alt="Image 4"
						width={240}
					/>
				</div>
			</Link>
			<div className="relative z-20 -ml-20 object-contain transition duration-300 ease-in-out transform hover:-translate-y-2">
				<Link href={`/card/${cards.data[4].id}`}>
					<img
						className="drop-shadow-xl"
						src={
							cards.data[4].images.small ||
							'https://via.placeholder.com/245x342'
						}
						alt="Image 5"
						width={240}
					/>
				</Link>
			</div>
		</div>
	)
}

export default CardsDisplay
