import Link from 'next/link';

export default function StoreItem(props) {
	const item = props.item.data;

	return (
		<div className='m-5'>
			<Link href={`/${props.item.id}`}>
				<a>
					<img src={item.url} alt={item.name} className='h-64' />
				</a>
			</Link>
			<h2>{item.name}</h2>
			<h2>{item.description}</h2>
			<h2>{item.artist}</h2>
		</div>
	);
}
