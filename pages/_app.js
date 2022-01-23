import 'tailwindcss/tailwind.css';
// import '@stripe/stripe-js';
import CartContextProvider from '../context/cart-context';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
	return (
		<CartContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</CartContextProvider>
	);
}

export default MyApp;
