import Set from './Set'

interface SerieProps {
	name: string
	sets: any[]
}

function Serie({ name, sets }: SerieProps) {
	return (
		<div className="w-full flex flex-col p-10">
			<h1 className="text-3xl font-extrabold mb-5">{name}</h1>
			<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8 pb-8">
				{sets
					.sort((a, b) =>
						a.name > b.name ? 1 : b.name > a.name ? -1 : 0
					)
					.map((set: any) => (
						<Set
							key={set.id}
							id={set.id}
							name={set.name}
							releaseDate={set.releaseDate}
							totalCards={set.total}
							symbolUrl={set.images.symbol}
							logoUrl={set.images.logo}
						/>
					))}
			</div>
		</div>
	)
}

export default Serie
