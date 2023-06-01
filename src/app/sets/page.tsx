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
			{series.map((serie: string) => (
				<Serie
					key={serie}
					name={serie}
					sets={getSetsForSerie(serie)}
				/>
			))}
		</div>
	)
}

export default setsPage
