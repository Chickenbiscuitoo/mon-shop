import Link from 'next/link'

import snorlaxGIF from 'public/images/snorlax.gif'
import snorlaxPNG from 'public/images/snorlax.png'

const Header = () => {
	return (
		<header className="bg-neutral flex px-10 py-3 place-content-center place-items-center">
			<Link href="/">
				<div className="flex">
					<img
						src={snorlaxPNG.src}
						className="mr-3 h-6 sm:h-9"
						alt="snorlax"
					/>
					<span
						className="self-center text-3xl font-semibold whitespace-nowrap bg-gradient-to-r bg-clip-text text-transparent 
            from-[#5098a8] via-primary to-[#5098a8]
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
