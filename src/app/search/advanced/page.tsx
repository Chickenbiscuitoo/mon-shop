import getQueryClient from '@/queryUtils/getQueryClient'
import Hydrate from '@/queryUtils/hydrate.client'
import { dehydrate } from '@tanstack/query-core'
import ClientPage from './ClientPage'

async function getSets() {
	const res = await fetch('https://api.pokemontcg.io/v2/sets')
	return res.json()
}

async function getTypes() {
	const res = await fetch('https://api.pokemontcg.io/v2/types')
	return res.json()
}

async function getSubTypes() {
	const res = await fetch('https://api.pokemontcg.io/v2/subtypes')
	return res.json()
}

async function getSuperTypes() {
	const res = await fetch('https://api.pokemontcg.io/v2/supertypes')
	return res.json()
}

async function getRarities() {
	const res = await fetch('https://api.pokemontcg.io/v2/rarities')
	return res.json()
}

async function advancedSearchPageServer() {
	const queryClient = getQueryClient()

	await queryClient.prefetchQuery(['hydrate-sets'], getSets)
	await queryClient.prefetchQuery(['hydrate-types'], getTypes)
	await queryClient.prefetchQuery(['hydrate-subtypes'], getSubTypes)
	await queryClient.prefetchQuery(['hydrate-supertypes'], getSuperTypes)
	await queryClient.prefetchQuery(['hydrate-rarities'], getRarities)

	const dehydratedState = dehydrate(queryClient)

	return (
		<Hydrate state={dehydratedState}>
			<ClientPage />
		</Hydrate>
	)
}

export default advancedSearchPageServer
