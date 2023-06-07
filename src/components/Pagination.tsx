import Link from 'next/link'

interface paginationProps {
	currPage: number
	route: string
	queryParams?: string
}

function Pagination({ currPage, route, queryParams }: paginationProps) {
	const prevLink = `${route}/${currPage > 1 ? currPage - 1 : currPage}/${
		queryParams || ''
	}`
	const nextLink = `${route}/${currPage + 1}/${queryParams || ''}`

	return (
		<div className="join flex place-content-center place-items-center place-self-center w-full gap-2 m-2">
			<Link href={prevLink}>
				<button className="join-item btn" disabled={currPage < 2}>
					«
				</button>
			</Link>
			<button className="join-item btn cursor-default hover:bg-neutral w-1/4">
				Page {currPage}
			</button>
			<Link href={nextLink}>
				<button className="join-item btn">»</button>
			</Link>
		</div>
	)
}

export default Pagination
