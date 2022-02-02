import StoreItem from "./StoreItem";

export default function Gallery(props) {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 max-w-7xl mx-auto bg-white bg-opacity-80 p-5'>
			{props.items &&
				props.items.map(item => (
					<div key={item.id} className='w-full'>
						<StoreItem item={item} />
					</div>
				))}
		</div>
	);
}
