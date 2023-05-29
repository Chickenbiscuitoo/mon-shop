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

	return (
		<div className="bg-blue-200 flex flex-col place-content-center place-items-center border-radius-assm">
			<img src={mon.sprites.front_default} alt="" />
			<h2>#{mon.id}</h2>
			<h1>{name}</h1>
			<span>
				{mon.types.map((type: any) => (
					<h2 className="inline">{type.type.name}</h2>
				))}
			</span>
		</div>
	)
}

export default MonCard
