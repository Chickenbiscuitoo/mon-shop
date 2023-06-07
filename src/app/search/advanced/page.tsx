import getQueryClient from '@/queryUtils/getQueryClient'
import Hydrate from '@/queryUtils/hydrate.client'
import { dehydrate } from '@tanstack/query-core'
import ClientPage from './ClientPage'

async function getSuperTypes() {
	const res = await fetch('https://api.pokemontcg.io/v2/supertypes')
	return res.json()
}

async function advancedSearchPageServer() {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery(['hydrate-supertypes'], getSuperTypes)
	const dehydratedState = dehydrate(queryClient)

	return (
		<Hydrate state={dehydratedState}>
			<ClientPage />
		</Hydrate>
	)
}

export default advancedSearchPageServer
