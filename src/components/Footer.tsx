import { FaGithub } from 'react-icons/fa'

const Footer = () => {
	return (
		<footer className="bg-neutral h-10 flex place-content-center place-items-center  pt-6 pb-6">
			<a
				href="https://github.com/Chickenbiscuitoo"
				target="_blank"
				rel="noopener noreferrer"
				className="text-neutral"
			>
				<span className="text-base-content">
					chickenbiscuitoo
					<FaGithub className="inline ml-1" />
				</span>
			</a>
		</footer>
	)
}

export default Footer
