function SearchBar() {
	return (
		<div className="join flex border-collapse">
			<input
				className="input join-item border-neutral border-collapse border-2 rounded-l-3xl rounded-r-none"
				placeholder="Search..."
			/>
			<select className="select join-item rounded-none border-neutral border-collapse border-2">
				<option disabled selected>
					Category
				</option>
				<option>Sci-fi</option>
				<option>Drama</option>
				<option>Action</option>
			</select>
			<button className="btn join-item rounded-r-3xl rounded-l-none border-collapse">
				Search
			</button>
		</div>
	)
}

export default SearchBar
