import { FaGithub } from 'react-icons/fa'

const Footer = () => {
	return (
		<footer className="h-10 flex place-content-center place-items-center border-t-2 border-base-content pt-6 pb-6">
			<a
				href="https://github.com/Chickenbiscuitoo"
				target="_blank"
				rel="noopener noreferrer"
				className="text-neutral"
			>
				<span>
					Chickenbiscuitoo
					<FaGithub className="inline ml-1" />
				</span>
			</a>
		</footer>
	)
}

export default Footer
