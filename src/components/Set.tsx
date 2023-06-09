import Link from 'next/link'

interface SetProps {
	id: string
	name: string
	releaseDate: string
	totalCards: number
	symbolUrl: string
	logoUrl: string
}

function Set({
	id,
	name,
	releaseDate,
	totalCards,
	symbolUrl,
	logoUrl,
}: SetProps) {
	return (
		<div className="border-2 border-base-content card card-compact max-h-80 bg-base-100 shadow-lg p-5 hover:scale-110 duration-300 hover:z-50">
			<figure className="h-2/3">
				<img
					src={logoUrl}
					alt={name}
					className="object-scale-down h-full w-full"
				/>
			</figure>
			<div className="card-body h-1/3">
				<span>
					<Link href={`/sets/${id}`}>
						<h2 className="card-title inline text-2xl font-extrabold hover:cursor-pointer">
							{name}
						</h2>
					</Link>
					<h5 className="font-light">Released {releaseDate}</h5>
				</span>
			</div>
			<div className="flex place-content-end">
				<div className="badge badge-ghost">
					<div>{totalCards} cards</div>
				</div>
			</div>
		</div>
	)
}

export default Set
