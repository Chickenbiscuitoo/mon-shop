'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

function SearchBar() {
	const router = useRouter()

	const [search, setSearch] = useState('')

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		router.push(`/search/1?name=${search}`)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="join flex border-collapse"
		>
			<input
				className="input join-item border-neutral border-collapse border-2 rounded-l-3xl rounded-r-none"
				placeholder="Search..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button
				type="submit"
				className="btn join-item rounded-r-3xl rounded-l-none border-collapse"
			>
				Search
			</button>
		</form>
	)
}

{
	/* <select className="select join-item rounded-none border-neutral border-collapse border-2">
	<option disabled selected>
		Category
	</option>
	<option>Sci-fi</option>
	<option>Drama</option>
	<option>Action</option>
</select> */
}

export default SearchBar
