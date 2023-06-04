import Link from 'next/link'

const Header = () => {
	return (
		<header className="bg-neutral flex px-10 py-3 place-content-center place-items-center">
			<Link href="/">
				<div className="flex">
					<img
						src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmM2NzFkMGZlZGM3N2IwZmQyZDQ4Yjc2OGE0YTc3NGRhMDY0MzZmZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/n2ytlxNQLodGM/giphy.gif"
						className="mr-3 h-6 sm:h-9"
						alt="snorlax"
					/>
					<span
						className="self-center text-3xl font-semibold whitespace-nowrap bg-gradient-to-r bg-clip-text text-transparent 
            from-[#4070b8] via-primary to-[#285880]
            animate-text"
					>
						monShop
					</span>
				</div>
			</Link>
			<div className="flex-grow" />
			<div className="flex gap-5">
				<Link href="/sets">
					<span className="text-lg font-semibold whitespace-nowrap text-white hover:underline">
						Sets
					</span>
				</Link>
				<Link href="/cards/1">
					<span className="text-lg font-semibold whitespace-nowrap text-white hover:underline">
						Cards
					</span>
				</Link>
			</div>
		</header>
	)
}

export default Header
