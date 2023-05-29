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
		<div className="bg-red-200 grid grid-cols-4 w-full">
			{mons.results.map((mon: any) => (
				/* @ts-expect-error Async Server Component */
				<MonCard name={mon.name} url={mon.url} />
			))}
		</div>
	)
}

export default Home
