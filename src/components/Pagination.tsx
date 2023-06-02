interface paginationProps {
	currPage: number
}

function Pagination({ currPage }: paginationProps) {
	return (
		<div className="join flex place-content-center place-items-center place-self-center w-full gap-2 m-2">
			<button className="join-item btn">«</button>
			<button className="join-item btn">Page {currPage}</button>
			<button className="join-item btn">»</button>
		</div>
	)
}

export default Pagination
