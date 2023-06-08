import Serie from '@/components/Serie'

async function getSets() {
	const res = await fetch('https://api.pokemontcg.io/v2/sets')
	return res.json()
}

async function setsPage() {
	const sets = await getSets()
	const series: string[] = []

	sets.data.forEach((set: any) => {
		if (!series.includes(set.series)) {
			series.push(set.series)
		}
	})

	function getSetsForSerie(series: string) {
		return sets.data.filter((set: any) => set.series === series)
	}

	return (
		<div>
			{series.sort().map((serie: string) => (
				<Serie
					key={serie}
					name={serie}
					sets={getSetsForSerie(serie)}
				/>
			))}
			<div className="shape-blob fixed -z-50 bg-primary"></div>
			<div className="shape-blob one fixed -z-50 bg-primary"></div>
			<div className="shape-blob two fixed -z-50 bg-primary"></div>
			<div className="shape-blob three fixed -z-50 bg-primary"></div>
		</div>
	)
}

export default setsPage
