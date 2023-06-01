type Params = {
	params: {
		setId: string
	}
}

async function getSet(setId: string) {
	const res = await fetch(
		`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`
	)
	return res.json()
}

async function SetPage({ params: { setId } }: Params) {
	const set = await getSet(setId)

	console.log(set)

	return <div>{setId}</div>
}

export default SetPage
