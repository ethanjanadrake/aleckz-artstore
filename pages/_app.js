import "tailwindcss/tailwind.css";
// import '@stripe/stripe-js';
import CartContextProvider from "../context/cart-context";
import Layout from "../components/Layout";
import "../styles/hamburger.css";

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
