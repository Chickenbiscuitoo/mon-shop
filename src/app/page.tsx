import SearchBar from '@/components/SearchBar'
import CardsDisplay from '@/components/CardsDisplay'

function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex flex-col flex-1 h-full place-items-center place-content-center">
				<img
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

			<div className="flex-grow-0 flex-shrink-0 flex place-items-center place-content-center overflow-hidden">
				{/* @ts-expect-error Async Server Component */}
				<CardsDisplay />
			</div>
		</div>
	)
}

export default Home
