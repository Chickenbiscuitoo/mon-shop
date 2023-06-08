import Image from 'next/image'

import { Silkscreen } from 'next/font/google'

const silkscreen = Silkscreen({ subsets: ['latin'], weight: '400' })

function LoadingPage() {
	return (
		<div className="flex flex-col min-h-screen place-items-center place-content-center">
			<div className="flex flex-col flex-1 h-full place-items-center place-content-center">
				<Image
					src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmM2NzFkMGZlZGM3N2IwZmQyZDQ4Yjc2OGE0YTc3NGRhMDY0MzZmZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/n2ytlxNQLodGM/giphy.gif"
					alt="snorlax"
					width={250}
					height={250}
					priority={true}
				/>
				<div className={silkscreen.className}>
					<span
						className="self-center text-7xl font-extrabold whitespace-nowrap bg-gradient-to-r bg-clip-text text-transparent 
    from-[#4070b8] via-primary to-[#285880]
    animate-text"
					>
						loading...
					</span>
				</div>
			</div>

			<div className="shape-blob -z-50 bg-primary"></div>
			<div className="shape-blob one -z-50 bg-primary"></div>
			<div className="shape-blob two -z-50 bg-primary"></div>
		</div>
	)
}

export default LoadingPage
