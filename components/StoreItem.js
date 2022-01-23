import Link from 'next/link';

export default function StoreItem(props) {
	const item = props.item.data;

	return (
		<div className='m-5'>
			<Link href={`/${props.item.id}`}>
				<a className=''>
					<img src={item.url} alt={item.name} className='w-full h-auto' />
				</a>
			</Link>
			<h2>{item.name}</h2>
			<h2>{item.description}</h2>
			<h2>{item.artist}</h2>
			<h2>${parseFloat(item.price).toFixed(2)}</h2>
		</div>
	);
}
