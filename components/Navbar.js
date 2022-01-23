import CartIcon from './CartIcon';
import firebase from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';

export default function Navbar() {
	const [
		user
	] = useAuthState(firebase.auth());

	return (
		<div className='w-full bg-black h-12 flex justify-between text-white'>
			<div className='flex'>
				<div className='px-3'>
					<Link href='/'>
						<a>HOME</a>
					</Link>
				</div>
				{!user || user.uid === 's458jrHiHTZY6wiJUfc8jJ0FR1J3' ? (
					<div className='px-3'>
						<Link href='/signin'>
							<a>LOG IN</a>
						</Link>
					</div>
				) : (
					<div className='px-3'>
						<Link href='/signout'>
							<a>LOG OUT</a>
						</Link>
					</div>
				)}
				{user && (
					<div className='px-3'>
						<Link href={`/user`}>
							<a>ACCOUNT</a>
						</Link>
					</div>
				)}
			</div>
			<Link href='/cart'>
				<a>
					<CartIcon />
				</a>
			</Link>
		</div>
	);
}
