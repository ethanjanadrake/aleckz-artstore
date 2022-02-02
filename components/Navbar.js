import CartIcon from "./CartIcon";
import firebase from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { useRouter } from "next/router";

function NavLink({ href, name }) {
	const router = useRouter();
	return (
		<Link href={href}>
			<a
				className={`px-3 h-full flex items-center transition-all duration-300 hover:bg-secondary-500 ${
					router.pathname === href && "bg-secondary-500"
				}`}
			>
				{name}
			</a>
		</Link>
	);
}

export default function Navbar() {
	const [user] = useAuthState(firebase.auth());
	const router = useRouter();

	return (
		<div className='fixed z-10 top-0 w-full bg-tertiary-500 font-title h-12 flex justify-between items-center text-primary-100'>
			<div className='flex items-center h-full'>
				<NavLink href='/' name='HOME' />
				{!user ||
				user.uid === "s458jrHiHTZY6wiJUfc8jJ0FR1J3" ||
				user.uid === "Q0XV5ZKvI3VmX3z8hrDPPuGDmYQ2" ? (
					<NavLink href='/signin' name='LOG IN' />
				) : (
					<NavLink href='/signout' name='LOG OUT' />
				)}
				{user && <NavLink href='/user' name='ACCOUNT' />}
			</div>
			<Link href='/cart'>
				<a
					className={`transition-all duration-300 hover:text-secondary-100 ${
						router.pathname === "/cart" && "text-secondary-100"
					}`}
				>
					<CartIcon />
				</a>
			</Link>
		</div>
	);
}
