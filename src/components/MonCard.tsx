interface MonCardProps {
	name: string
	url: string
}

async function getMon(url: string) {
	const res = await fetch(url)
	return res.json()
}

async function MonCard({ name, url }: MonCardProps) {
	const mon = await getMon(url)

	console.log(mon)

	return <div>{name}</div>
}

export default MonCard
