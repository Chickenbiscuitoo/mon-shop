function LoadingPage() {
	return (
		<div className="flex flex-col">
			<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10">
				{Array.apply(null, Array(60)).map((_, i) => (
					<div
						key={i}
						className="hover:cursor-pointer hover:scale-110 duration-300"
					>
						<div
							className="bg-gray-200 animate-pulse rounded-lg"
							style={{
								width: '245px',
								height: '342px',
							}}
						></div>
					</div>
				))}
			</div>
			<div className="join flex place-content-center place-items-center place-self-center w-full gap-2 m-2">
				<div
					className="bg-gray-200 animate-pulse rounded-lg"
					style={{
						width: '50px',
						height: '50px',
					}}
				></div>
				<div
					className="bg-gray-200 animate-pulse rounded-lg"
					style={{
						width: '300px',
						height: '50px',
					}}
				></div>
				<div
					className="bg-gray-200 animate-pulse rounded-lg"
					style={{
						width: '50px',
						height: '50px',
					}}
				></div>
			</div>

			<div className="shape-blob fixed -z-50 bg-primary"></div>
			<div className="shape-blob one fixed -z-50 bg-primary"></div>
			<div className="shape-blob two fixed -z-50 bg-primary"></div>
			<div className="shape-blob three fixed -z-50 bg-primary"></div>
		</div>
	)
}

export default LoadingPage
