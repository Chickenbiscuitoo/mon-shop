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
			<img
				className="relative z-20 object-contain transition duration-300 ease-in-out transform hover:-translate-y-2 drop-shadow-2xl"
				src={cards.data[0].images.small}
				alt="Image 1"
				width={240}
			/>
			<img
				className="relative z-10 -ml-20 -mt-44 object-contain transition duration-300 ease-in-out transform hover:-translate-y-2 drop-shadow-2xl"
				src={cards.data[1].images.small}
				alt="Image 2"
				width={240}
			/>
			<img
				className="relative z-20 -ml-20 -mt-20 object-contain transition duration-300 ease-in-out transform hover:-translate-y-2 drop-shadow-2xl"
				src={cards.data[2].images.small}
				alt="Image 3"
				width={240}
			/>
			<img
				className="relative z-10 -ml-20 -mt-44 object-contain transition duration-300 ease-in-out transform hover:-translate-y-2 drop-shadow-2xl"
				src={cards.data[3].images.small}
				alt="Image 4"
				width={240}
			/>
			<img
				className="relative z-20 -ml-20 object-contain transition duration-300 ease-in-out transform hover:-translate-y-2 drop-shadow-2xl"
				src={cards.data[4].images.small}
				alt="Image 5"
				width={240}
			/>
		</div>
	)
}

export default CardsDisplay
