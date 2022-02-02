import Link from "next/link";

export default function StoreItem(props) {
	const item = props.item.data;

	return (
		<div className='group transition-all duration-500 p-5 hover:p-0 w-full h-full'>
			<div className='bg-primary-100 rounded-lg w-full h-full shadow-lg'>
				<Link href={`/${props.item.id}`}>
					<a className='w-full'>
						<div className='relative w-full'>
							<img
								src={item.url}
								alt={item.name}
								className='w-full h-auto rounded-t-lg'
							/>
							<h2 className='absolute right-0 bottom-0 bg-white bg-opacity-50 group-hover:bg-opacity-100 transition-all duration-500 p-1 rounded-tl-lg'>
								${parseFloat(item.price).toFixed(2)}
							</h2>
						</div>
					</a>
				</Link>
				<h2 className='capitalize text-xl font-bold text-center text-secondary-300 font-title -mb-2 mt-2'>
					{item.name}
				</h2>
				<h2 className='font-bold text-sm text-center text-tertiary-200 pb-3'>
					{item.artist}
				</h2>
				<div className='p-5 w-64 mx-auto'>
					<h2 className='font-normal text-sm text-secondary-100'>
						{item.description}
					</h2>
				</div>
			</div>
		</div>
	);
}
