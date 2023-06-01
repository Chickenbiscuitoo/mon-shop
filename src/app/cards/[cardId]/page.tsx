type Params = {
	params: {
		cardId: string
	}
}

interface cardRarity {
	[key: string]: string
}

async function getCard(cardId: string) {
	const res = await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`)
	return res.json()
}

async function CardPage({ params: { cardId } }: Params) {
	const card = await getCard(cardId)

	// card rarity in text color in hex
	const cardRarity: cardRarity = {
		Common: '#1eff00',
		Uncommon: '#0070dd',
		Rare: '#a335ee',
	}

	console.log(card.data)

	return (
		<div className="flex p-14 gap-14">
			<div className="w-1/3">
				<img
					src={card.data?.images?.large}
					alt={card.data?.name}
				/>
			</div>
			<div className="w-2/3">
				<div className="flex flex-row border-b-2 border-b-base-content">
					<div className="flex flex-col flex-1">
						<h1 className="font-bold text-4xl">
							{card.data?.name}
						</h1>
						<h4 className="font-extralight text-lg">
							{card.data?.supertype} - {card.data?.subtypes}
						</h4>
					</div>
					<div className="flex flex-col">
						<div className="flex">
							<h4 className="inline text-lg font-semibold">
								{card.data?.set?.name.toUpperCase()}
							</h4>
							<img
								src={card.data?.set?.images?.symbol}
								alt={card.data?.set?.name}
								width="25"
								height="25"
								className="inline w-[25px] h-[25px]"
							/>
						</div>
						<div>
							<h4
								className="text-lg font-semibold"
								style={{
									color: cardRarity[
										card.data?.rarity?.split(' ')[0]
									],
								}}
							>
								{card.data?.rarity?.toUpperCase()}
							</h4>
						</div>
					</div>
				</div>
				{card.data?.cardmarket?.prices && (
					<div className="flex flex-col mt-2">
						<span>
							<h4 className="text-2xl font-semibold">
								Card Market Prices
							</h4>
							<h6 className="font-extralight text-xs">
								Last Updated{' '}
								{card.data?.cardmarket?.updatedAt}
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
										{
											card.data?.cardmarket?.prices
												?.trendPrice
										}
									</td>
									<td className="text-green-400">
										$
										{
											card.data?.cardmarket?.prices
												?.avg1
										}
									</td>
									<td className="text-blue-400">
										$
										{
											card.data?.cardmarket?.prices
												?.avg7
										}
									</td>
									<td className="text-purple-400">
										$
										{
											card.data?.cardmarket?.prices
												?.avg30
										}
									</td>
								</tr>
							</thead>
						</table>
					</div>
				)}
				{card.data?.tcgplayer?.prices && (
					<div className="flex flex-col mt-2">
						<span>
							<h4 className="text-2xl font-semibold">
								TCGplayer Prices
							</h4>
							<h6 className="font-extralight text-xs">
								Last Updated{' '}
								{card.data?.tcgplayer?.updatedAt}
							</h6>
						</span>
						{card.data?.tcgplayer?.prices?.normal && (
							<table
								className="table-fixed mt-5"
								width={350}
							>
								<thead>
									<tr>
										<th>Normal Market</th>
										<th>Normal Low</th>
										<th>Normal Mid</th>
										<th>Normal High</th>
									</tr>
									<tr className="text-center">
										<td className="text-red-400">
											$
											{
												card.data?.tcgplayer
													?.prices?.normal
													?.market
											}
										</td>
										<td className="text-green-400">
											$
											{
												card.data?.tcgplayer
													?.prices?.normal?.low
											}
										</td>
										<td className="text-blue-400">
											$
											{
												card.data?.tcgplayer
													?.prices?.normal?.mid
											}
										</td>
										<td className="text-purple-400">
											$
											{
												card.data?.tcgplayer
													?.prices?.normal?.high
											}
										</td>
									</tr>
								</thead>
							</table>
						)}
						{card.data?.tcgplayer?.prices?.holofoil && (
							<table
								className="table-fixed mt-5"
								width={350}
							>
								<thead>
									<tr>
										<th>Holofoil Market</th>
										<th>Holofoil Low</th>
										<th>Holofoil Mid</th>
										<th>Holofoil High</th>
									</tr>
									<tr className="text-center">
										<td className="text-red-400">
											$
											{
												card.data?.tcgplayer
													?.prices?.holofoil
													.market
											}
										</td>
										<td className="text-green-400">
											$
											{
												card.data?.tcgplayer
													?.prices?.holofoil.low
											}
										</td>
										<td className="text-blue-400">
											$
											{
												card.data?.tcgplayer
													?.prices?.holofoil.mid
											}
										</td>
										<td className="text-purple-400">
											$
											{
												card.data?.tcgplayer
													?.prices?.holofoil.high
											}
										</td>
									</tr>
								</thead>
							</table>
						)}
						{card.data?.tcgplayer?.prices?.reverseHolofoil && (
							<table
								className="table-fixed mt-5"
								width={350}
							>
								<thead>
									<tr>
										<th>Reverse Holofoil Market</th>
										<th>Reverse Holofoil Low</th>
										<th>Reverse Holofoil Mid</th>
										<th>Reverse Holofoil High</th>
									</tr>
									<tr className="text-center">
										<td className="text-red-400">
											$
											{
												card.data?.tcgplayer
													?.prices
													?.reverseHolofoil
													.market
											}
										</td>
										<td className="text-green-400">
											$
											{
												card.data?.tcgplayer
													?.prices
													?.reverseHolofoil.low
											}
										</td>
										<td className="text-blue-400">
											$
											{
												card.data?.tcgplayer
													?.prices
													?.reverseHolofoil.mid
											}
										</td>
										<td className="text-purple-400">
											$
											{
												card.data?.tcgplayer
													?.prices
													?.reverseHolofoil.high
											}
										</td>
									</tr>
								</thead>
							</table>
						)}
					</div>
				)}
				<div className="mt-10">
					<p className="italic font-bold">
						"{card.data?.flavorText}"
					</p>
				</div>
			</div>
		</div>
	)
}

export default CardPage
