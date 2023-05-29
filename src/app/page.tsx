import MonCard from '../components/MonCard'

async function getMons() {
	const res = await fetch(
		'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
	)
	return res.json()
}

async function Home() {
	const mons = await getMons()

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-5 p-10">
			{mons.results.map((mon: any) => (
				/* @ts-expect-error Async Server Component */
				<MonCard name={mon.name} url={mon.url} />
			))}
		</div>
	)
}

export default Home
