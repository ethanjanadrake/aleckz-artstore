export default function cancel() {
	return (
		<div className='mt-32 bg-primary-100 max-w-xl mx-auto p-12 shadow-lg text-center rounded-lg font-normal'>
			<h1 className='font-title text-2xl mb-10 font-bold text-secondary-300'>
				Cancelled
			</h1>
			<p>Either the order was cancelled or something went wrong.</p>
		</div>
	);
}
