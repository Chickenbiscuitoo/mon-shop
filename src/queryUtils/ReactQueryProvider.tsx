'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const ReactQueryProvider = ({ children }: React.PropsWithChildren) => (
	<QueryClientProvider client={queryClient}>
		{children}
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
)

export default ReactQueryProvider
