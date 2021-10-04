import StoreItem from './StoreItem';

export default function Gallery(props) {
	return (
		<div className='flex flex-wrap m-16'>
			{props.items &&
				props.items.map((item) => (
					<div key={item.id} className='w-1/4'>
						<StoreItem item={item} />
					</div>
				))}
		</div>
	);
}
