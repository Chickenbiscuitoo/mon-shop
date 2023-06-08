import type { PokemonCard } from '../../../../types/monCard'

import Link from 'next/link'

type Params = {
	params: {
		cardId: string
	}
}

type PriceInfo = {
	low: number
	mid: number
	high: number
	market: number
}

type Prices = {
	normal?: PriceInfo
	holofoil?: PriceInfo
	reverseHolofoil?: PriceInfo
	'1stEditionHolofoil'?: PriceInfo
	'1stEditionNormal'?: PriceInfo
}

async function getCard(cardId: string) {
	const res = await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`)

	return res.json()
}

async function CardPage({ params: { cardId } }: Params) {
	const cardData = await getCard(cardId)

	const card: PokemonCard = cardData.data

	const cardRarity: string = card?.rarity?.split(' ')[0]

	return (
		<div className="flex p-14 gap-14">
			<div className="w-1/3">
				<img src={card?.images?.large} alt={card?.name} />
			</div>
			<div className="w-2/3">
				<div className="flex flex-row border-b-2 border-b-base-content">
					<div className="flex flex-col flex-1">
						<h1 className="font-bold text-4xl">
							{card?.name}
						</h1>
						<h4 className="font-extralight text-lg">
							{card?.supertype} - {card?.subtypes}
						</h4>
					</div>
					<div className="flex flex-col">
						<div className="flex">
							<Link href={`/sets/${card.set.id}`}>
								<h4 className="inline text-lg font-semibold">
									{card?.set?.name.toUpperCase()}
								</h4>
								<img
									src={card?.set?.images?.symbol}
									alt={card?.set?.name}
									width="25"
									height="25"
									className="inline w-[25px] h-[25px]"
								/>
							</Link>
						</div>
						<div>
							{cardRarity === 'Common' && (
								<Link
									href={`/search/1?rarity=${card?.rarity}`}
								>
									<h4
										className={`text-lg font-semibold bg-gradient-to-r bg-clip-text text-transparent from-lime-300 to-emerald-800 animate-text`}
									>
										{card?.rarity?.toUpperCase()}
									</h4>
								</Link>
							)}
							{cardRarity === 'Uncommon' && (
								<Link
									href={`/search/1?rarity=${card?.rarity}`}
								>
									<h4
										className={`text-lg font-semibold bg-gradient-to-r bg-clip-text text-transparent from-cyan-300 to-blue-800 animate-text`}
									>
										{card?.rarity?.toUpperCase()}
									</h4>
								</Link>
							)}
							{cardRarity === 'Rare' && (
								<Link
									href={`/search/1?rarity=${card?.rarity}`}
								>
									<h4
										className={`text-lg font-semibold bg-gradient-to-r bg-clip-text text-transparent from-indigo-300 to-purple-800 animate-text`}
									>
										{card?.rarity?.toUpperCase()}
									</h4>
								</Link>
							)}
							{cardRarity !== 'Common' &&
								cardRarity !== 'Uncommon' &&
								cardRarity !== 'Rare' && (
									<Link
										href={`/search/1?rarity=${card?.rarity}`}
									>
										<h4
											className={`text-lg font-semibold bg-gradient-to-r bg-clip-text text-transparent from-amber-300 to-yellow-800 animate-text`}
										>
											{card?.rarity?.toUpperCase()}
										</h4>
									</Link>
								)}
						</div>
					</div>
				</div>
				{card?.cardmarket?.prices && (
					<div className="flex flex-col mt-2">
						<span>
							<h4 className="text-2xl font-semibold">
								Card Market Prices
							</h4>
							<h6 className="font-extralight text-xs">
								Last Updated {card?.cardmarket?.updatedAt}
							</h6>
						</span>
						<table className="table-fixed my-5" width={350}>
							<thead>
								<tr>
									<th>Price Trend</th>
									<th>1 Day Average</th>
									<th>7 Day Average</th>
									<th>30 Day Average</th>
								</tr>
								<tr className="text-center">
									<td className="text-red-400">
										$
										{card?.cardmarket?.prices
											?.trendPrice || 0}
									</td>
									<td className="text-green-400">
										$
										{card?.cardmarket?.prices?.avg1 ||
											0}
									</td>
									<td className="text-blue-400">
										$
										{card?.cardmarket?.prices?.avg7 ||
											0}
									</td>
									<td className="text-purple-400">
										$
										{card?.cardmarket?.prices?.avg30 ||
											0}
									</td>
								</tr>
							</thead>
						</table>
					</div>
				)}
				{card?.tcgplayer?.prices && (
					<div className="flex flex-col mt-2">
						<span>
							<h4 className="text-2xl font-semibold">
								TCGplayer Prices
							</h4>
							<h6 className="font-extralight text-xs">
								Last Updated {card?.tcgplayer?.updatedAt}
							</h6>
						</span>
						{(
							Object.keys(card?.tcgplayer?.prices) as Array<
								keyof Prices
							>
						).map((keyName: keyof Prices, i) => (
							<table
								className="table-fixed mt-5"
								width={600}
								key={i}
							>
								<thead>
									<tr>
										<th>
											{keyName
												.replace(
													/([a-z](?=[A-Z]))/g,
													'$1 '
												)
												.toUpperCase()}{' '}
											<span className="font-bold underline">
												Market
											</span>
										</th>
										<th>
											{keyName
												.replace(
													/([a-z](?=[A-Z]))/g,
													'$1 '
												)
												.toUpperCase()}{' '}
											<span className="font-bold underline">
												Low
											</span>
										</th>
										<th>
											{keyName
												.replace(
													/([a-z](?=[A-Z]))/g,
													'$1 '
												)
												.toUpperCase()}{' '}
											<span className="font-bold underline">
												Mid
											</span>
										</th>
										<th>
											{keyName
												.replace(
													/([a-z](?=[A-Z]))/g,
													'$1 '
												)
												.toUpperCase()}{' '}
											<span className="font-bold underline">
												High
											</span>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="text-center">
										<td className="text-red-400">
											$
											{card?.tcgplayer?.prices[
												keyName
											]?.market || 0}
										</td>
										<td className="text-green-400">
											$
											{card?.tcgplayer?.prices[
												keyName
											]?.low || 0}
										</td>
										<td className="text-blue-400">
											$
											{card?.tcgplayer?.prices[
												keyName
											]?.mid || 0}
										</td>
										<td className="text-purple-400">
											$
											{card?.tcgplayer?.prices[
												keyName
											]?.high || 0}
										</td>
									</tr>
								</tbody>
							</table>
						))}
					</div>
				)}

				{card?.flavorText && (
					<div className="mt-10">
						<p className="italic font-bold">
							"{card?.flavorText}"
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default CardPage
