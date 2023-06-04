import { Silkscreen } from 'next/font/google'

const silkscreen = Silkscreen({ subsets: ['latin'], weight: '400' })

function LoadingPage() {
	return (
		<div className="flex flex-col place-content-center place-items-center place-self-center w-full gap-2 m-2">
			<div className={silkscreen.className}>
				<h1 className="text-2xl font-bold text-[#f7e901]">
					Loading...
				</h1>
			</div>

			<img
				src="https://media2.giphy.com/media/x83yCwqh9fnK8/giphy.gif?cid=ecf05e47bqr5grn30majfe7am99lbajtmwohsbj9urqkruhm&ep=v1_stickers_search&rid=giphy.gif&ct=s"
				alt="picachu"
				width="300"
				height="300"
			/>
		</div>
	)
}

export default LoadingPage
