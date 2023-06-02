import Link from 'next/link'

interface paginationProps {
	currPage: number
	route: string
}

function Pagination({ currPage, route }: paginationProps) {
	const prevLink = `${route}/${currPage > 1 ? currPage - 1 : currPage}`
	const nextLink = `${route}/${currPage + 1}`

	return (
		<div className="join flex place-content-center place-items-center place-self-center w-full gap-2 m-2">
			<Link href={prevLink}>
				<button className="join-item btn">«</button>
			</Link>
			<button className="join-item btn">Page {currPage}</button>
			<Link href={nextLink}>
				<button className="join-item btn">»</button>
			</Link>
		</div>
	)
}

export default Pagination
