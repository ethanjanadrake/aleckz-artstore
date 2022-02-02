import CartIcon from "./CartIcon";
import firebase from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function NavLink({ href, name }) {
	const router = useRouter();
	return (
		<Link href={href}>
			<a
				className={`p-5 sm:py-0 sm:px-3 h-full flex items-center transition-all duration-300 hover:bg-secondary-500 ${
					router.pathname === href && "bg-secondary-500"
				}`}
			>
				{name}
			</a>
		</Link>
	);
}

function NavLinks() {
	const [user] = useAuthState(firebase.auth());
	return (
		<>
			<NavLink href='/' name='HOME' />
			{user &&
				(user.uid === "s458jrHiHTZY6wiJUfc8jJ0FR1J3" ||
					user.uid === "Q0XV5ZKvI3VmX3z8hrDPPuGDmYQ2") && (
					<NavLink href='/admin' name='ADMIN' />
				)}
			{user ? (
				<>
					<NavLink href='/signout' name='LOG OUT' />
					<NavLink href='/user' name='ACCOUNT' />
				</>
			) : (
				<NavLink href='/signin' name='LOG IN' />
			)}
			<NavLink href='/contact' name='CONTACT' />
		</>
	);
}

export default function Navbar() {
	const router = useRouter();
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div className='fixed z-10 top-0 w-full bg-tertiary-500 font-title h-12 flex justify-between items-center text-primary-100'>
			<div className='sm:hidden'>
				<button
					className={`hamburger hamburger--collapse ${menuOpen && "is-active"}`}
					type='button'
					onClick={() => {
						setMenuOpen(!menuOpen);
					}}
				>
					<span className='hamburger-box'>
						<span className='hamburger-inner'></span>
					</span>
				</button>
			</div>
			<div
				className={`flex flex-col fixed top-12 transition-all duration-500 bg-tertiary-500 sm:static sm:flex-row sm:items-center sm:h-full z-10 sm:z-0 ${
					menuOpen ? "left-0" : "-left-full"
				}`}
				onClick={() => {
					setMenuOpen(false);
				}}
			>
				<NavLinks />
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
			{menuOpen && (
				<div
					className='sm:hidden absolute h-screen w-screen bg-black opacity-50 top-12'
					onClick={() => {
						setMenuOpen(false);
					}}
				></div>
			)}
		</div>
	);
}
