import './globals.css'
import { Inter } from 'next/font/google'

import ReactQueryProvider from '@/queryUtils/ReactQueryProvider'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'monShop',
	description: 'Pokemon card database',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<ReactQueryProvider>
				<body className={inter.className}>
					<Header />
					<main className="min-h-screen flex place-content-center place-items-center">
						{children}
					</main>
					<Footer />
				</body>
			</ReactQueryProvider>
		</html>
	)
}
