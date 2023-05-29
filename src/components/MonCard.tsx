interface MonCardProps {
	name: string
	url: string
}

interface monTypeColorsDic {
	[Key: string]: string
}

async function getMon(url: string) {
	const res = await fetch(url)
	return res.json()
}

async function MonCard({ name, url }: MonCardProps) {
	const mon = await getMon(url)

	const monTypes = mon.types.map((type: any) => type.type.name)

	const monTypeColors: monTypeColorsDic = {
		normal: '#A8A878',
		fire: '#F08030',
		water: '#6890F0',
		electric: '#F8D030',
		grass: '#78C850',
		ice: '#98D8D8',
		fighting: '#C03028',
		poison: '#A040A0',
		ground: '#E0C068',
		flying: '#A890F0',
		psychic: '#F85888',
		bug: '#A8B820',
		rock: '#B8A038',
		ghost: '#705898',
		dragon: '#7038F8',
		dark: '#705848',
		steel: '#B8B8D0',
		fairy: '#EE99AC',
	}

	return (
		<div className="card glass place-items-center border-solid border-[#E0E0E0] cursor-pointer">
			<figure>
				<img
					src={mon.sprites.front_default}
					alt="mon pic"
					width={200}
					height={200}
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title">
					{name.toUpperCase()}
					<div className="badge badge-ghost">#{mon.id}</div>
				</h2>
				<div className="card-actions justify-center">
					{monTypes.map((type: string) => (
						<div
							className="badge text-xs p-3 border-transparent"
							style={{
								backgroundColor:
									monTypeColors[type] || '#A8A878',
							}}
						>
							{type.toUpperCase()}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default MonCard
