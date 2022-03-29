import Head from "next/head";
import Image from "next/image";

import Navbar from "./Navbar";

export default function Layout({ children }) {
	return (
		<div>
			<Head>
				<title>Zandart</title>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon-16x16.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/apple-touch-icon.png'
				/>
				<link rel='manifest' href='/site.webmanifest' />
				<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
				<meta name='theme-color' content='#ffffff' />
				<meta name='charset' content='UTF-8' />
				<meta property='og:title' content='Zandart' />
				<meta
					property='og:description'
					content='Drip paintings for sale by Aleckz.'
				/>
				<meta property='og:image' content='/socialimage.jpg' />
				<meta
					name='keywords'
					content='drip, painting, paint, painter, sale, store'
				/>
				<meta name='author' content='Ethan Jana Drake' />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
				<link
					href='https://fonts.googleapis.com/css2?family=Josefin+Sans&family=Roboto&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<img
				src='/siteimage.jpg'
				className='fixed top-0 w-full h-full md:h-auto'
				style={{ filter: "grayscale(100%)" }}
			></img>
			<div className='fixed w-full h-full top-0 opacity-50 bg-white'></div>
			<Navbar />
			<main className='absolute top-0 w-full'>{children}</main>
		</div>
	);
}
