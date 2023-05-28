import './globals.css'
import { Inter } from 'next/font/google'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'MonShop',
	description: 'Pokemon card shop',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Header />
				<main className="min-h-screen flex place-content-center place-items-center">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	)
}
