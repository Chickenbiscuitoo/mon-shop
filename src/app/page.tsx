import Image from 'next/image'

import SearchBar from '@/components/SearchBar'
import CardsDisplay from '@/components/CardsDisplay'

function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex flex-col flex-1 h-full place-items-center place-content-center">
				<Image
					src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmM2NzFkMGZlZGM3N2IwZmQyZDQ4Yjc2OGE0YTc3NGRhMDY0MzZmZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/n2ytlxNQLodGM/giphy.gif"
					alt="snorlax"
					width={250}
					height={250}
					className="mb-5"
				/>
				<span
					className="self-center text-7xl font-extrabold whitespace-nowrap bg-gradient-to-r bg-clip-text text-transparent 
            from-[#4070b8] via-primary to-[#285880]
            animate-text"
				>
					monShop
				</span>
				<p className="text-xl mb-10">
					The Ultimate Pokémon Card Database
				</p>
				<SearchBar />
			</div>

			<div className="shape-blob -z-50 bg-primary"></div>
			<div className="shape-blob one -z-50 bg-primary"></div>
			<div className="shape-blob two -z-50 bg-primary"></div>

			{(
				<div className="flex-grow-0 flex-shrink-0 flex place-items-center place-content-center overflow-hidden">
					{/* @ts-expect-error Async Server Component */}
					<CardsDisplay />
				</div>
			) || (
				<div className="flex-grow-0 flex-shrink-0 flex place-items-center place-content-center overflow-hidden">
					<div className="flex place-items-center place-content-center h-full transform translate-y-1/2">
						<div className="relative z-20 object-contain transition duration-300 ease-in-out transform hover:-translate-y-2">
							<div
								className="bg-gray-200 animate-pulse rounded-lg"
								style={{
									width: '245px',
									height: '342px',
								}}
							></div>
						</div>

						<div className="relative z-10 -ml-20 -mt-44 object-contain transition duration-300 ease-in-out transform hover:-translate-y-2">
							<div
								className="bg-gray-200 animate-pulse rounded-lg"
								style={{
									width: '245px',
									height: '342px',
								}}
							></div>
						</div>

						<div className="relative z-20 -ml-20 -mt-20 object-contain transition duration-300 ease-in-out transform hover:-translate-y-2">
							<div
								className="bg-gray-200 animate-pulse rounded-lg"
								style={{
									width: '245px',
									height: '342px',
								}}
							></div>
						</div>

						<div className="relative z-10 -ml-20 -mt-44 object-contain transition duration-300 ease-in-out transform hover:-translate-y-2">
							<div
								className="bg-gray-200 animate-pulse rounded-lg"
								style={{
									width: '245px',
									height: '342px',
								}}
							></div>
						</div>

						<div className="relative z-20 -ml-20 object-contain transition duration-300 ease-in-out transform hover:-translate-y-2">
							<div
								className="bg-gray-200 animate-pulse rounded-lg"
								style={{
									width: '245px',
									height: '342px',
								}}
							></div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Home
