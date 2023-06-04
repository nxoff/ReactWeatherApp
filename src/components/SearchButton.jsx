export default function SearchButton({ fetchData }) {
	return (
		<>
			<img
				className='card-search'
				src='./src/assets/search.png'
				alt='search'
				width='32'
				height='32'
				onClick={() => fetchData()}
			/>
		</>
	);
}
