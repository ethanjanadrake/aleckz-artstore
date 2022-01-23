import firebase from '../lib/firebase';
import 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { stateList } from '../lib/stateList';

export default function UserForm(props) {
	let originalData = {};
	if (props.originalData) {
		originalData = { ...props.originalData };
	}

	const [
		user,
		authLoading,
		authError
	] = useAuthState(firebase.auth());

	const [
		data,
		setData
	] = useState({});

	const [
		currentState,
		setCurrentState
	] = useState('DEFAULT');
	const [
		currentStateShip,
		setCurrentStateShip
	] = useState('DEFAULT');

	const [
		sameAsShip,
		setSameAsShip
	] = useState(true);

	useEffect(
		() => {
			if (props.originalData.address) {
				setCurrentState(props.originalData.address.state);
				if (props.originalData.shipping && props.originalData.shipping.address) {
					setCurrentStateShip(props.originalData.shipping.address.state);
				}
				setData({ ...originalData });
			}
		},
		[
			props
		]
	);

	const onSubmit = async (e) => {
		e.preventDefault();
		const newData = { ...data };
		if (!data.address) {
			newData.address = {};
		}

		// console.log(newData);

		for (let i = 0; i < e.target.length; i++) {
			if (!e.target[i].name.includes('_ship')) {
				if (
					![
						'file',
						'submit',
						'button'
					].includes(e.target[i].type)
				) {
					if (
						[
							'name',
							'phone'
						].includes(e.target[i].name)
					) {
						newData[e.target[i].name] = e.target[i].value;
					}
					else {
						newData.address[e.target[i].name] = e.target[i].value;
					}
				}
			}
		}
		if (sameAsShip) {
			newData.shipping = {};
			newData.shipping = { ...newData };
			delete newData.shipping.shipping;
			delete newData.shipping.id;
		}
		else {
			for (let i = 0; i < e.target.length; i++) {
				if (e.target[i].name.includes('_ship')) {
					if (
						![
							'file',
							'submit',
							'button'
						].includes(e.target[i].type)
					) {
						if (
							[
								'name_ship',
								'phone_ship'
							].includes(e.target[i].name)
						) {
							newData.shipping[e.target[i].name.replace('_ship', '')] = e.target[i].value;
						}
						else {
							newData.shipping.address[e.target[i].name.replace('_ship', '')] = e.target[i].value;
						}
					}
				}
			}
		}

		if (newData.address.line2 === '') {
			delete newData.address.line2;
		}
		if (newData.shipping.address.line2 === '') {
			delete newData.shipping.address.line2;
		}

		setData({ ...newData });
		const confirmation = confirm('Confirm Changes?');
		if (confirmation) {
			await firebase.firestore().collection('users').doc(user.uid).set({ ...newData });
			window.location.reload();
		}
	};

	return (
		<form onSubmit={onSubmit} className='p-10 bg-gray-100 m-20 mt-10 rounded-lg shadow-lg border-red-500'>
			<div className='grid grid-cols-4 gap-4'>
				<label htmlFor='name' className='p-3'>
					Name
				</label>
				<input
					type='text'
					id='name'
					defaultValue={originalData.name}
					name='name'
					placeholder='Name'
					className='transition-all p-3 rounded-xl w-full outline-none focus:ring focus:ring-yellow-300'
				/>
				<label htmlFor='line1' className='p-3'>
					Street Address
				</label>
				<input
					type='text'
					id='line1'
					defaultValue={originalData.address && originalData.address.line1}
					name='line1'
					placeholder='100 Park Dr.'
					className='transition-all p-3 rounded-xl w-full outline-none focus:ring focus:ring-yellow-300'
				/>
				<label htmlFor='line2' className='p-3'>
					Unit
				</label>
				<input
					type='text'
					id='line2'
					defaultValue={originalData.address && originalData.address.line2}
					name='line2'
					placeholder='Apt. 0000'
					className='transition-all p-3 rounded-xl w-full outline-none focus:ring focus:ring-yellow-300'
				/>

				<label htmlFor='state' className='p-3'>
					State
				</label>
				<select
					id='state'
					value={currentState}
					onChange={(e) => {
						setCurrentState(e.target.value);
					}}
					name='state'
					placeholder='0.00'
					className='transition-all p-3 rounded-xl w-full outline-none focus:ring focus:ring-yellow-300'
				>
					<option value='DEFAULT' />
					{stateList.map((state) => {
						return (
							<option key={state.abbreviation} value={state.abbreviation}>
								{state.name}
							</option>
						);
					})}
				</select>
				<label htmlFor='postal_code' className='p-3'>
					Zip Code
				</label>
				<input
					type='text'
					id='postal_code'
					defaultValue={originalData.address && originalData.address.postal_code}
					name='postal_code'
					placeholder='00000'
					className='transition-all p-3 rounded-xl w-full outline-none focus:ring focus:ring-yellow-300'
				/>
			</div>
			{sameAsShip ? (
				<button
					className='transition-all p-3 bg-green-400 rounded-xl hover:bg-green-200'
					onClick={() => {
						setSameAsShip(false);
					}}
				>
					Use a Different Address for Shipping
				</button>
			) : (
				<div>
					<label htmlFor='name_ship' className='p-3'>
						Name
					</label>
					<input
						type='text'
						id='name_ship'
						defaultValue={originalData.shipping.name}
						name='name_ship'
						placeholder='Name'
						className='transition-all p-3 rounded-xl w-full outline-none focus:ring focus:ring-yellow-300'
					/>
					<label htmlFor='line1_ship' className='p-3'>
						Street Address
					</label>
					<input
						type='text'
						id='line1_ship'
						defaultValue={originalData.shipping.address && originalData.shipping.address.line1}
						name='line1_ship'
						placeholder='100 Park Dr.'
						className='transition-all p-3 rounded-xl w-full outline-none focus:ring focus:ring-yellow-300'
					/>
					<label htmlFor='line2_ship' className='p-3'>
						Unit
					</label>
					<input
						type='text'
						id='line2_ship'
						defaultValue={originalData.shipping.address && originalData.shipping.address.line2}
						name='line2_ship'
						placeholder='Apt. 0000'
						className='transition-all p-3 rounded-xl w-full outline-none focus:ring focus:ring-yellow-300'
					/>

					<label htmlFor='state_ship' className='p-3'>
						State
					</label>
					<select
						id='state_ship'
						value={currentStateShip}
						onChange={(e) => {
							setCurrentStateShip(e.target.value);
						}}
						name='state_ship'
						placeholder='0.00'
						className='transition-all p-3 rounded-xl w-full outline-none focus:ring focus:ring-yellow-300'
					>
						<option value='DEFAULT' />
						{stateList.map((state) => {
							return (
								<option key={state.abbreviation} value={state.abbreviation}>
									{state.name}
								</option>
							);
						})}
					</select>
					<label htmlFor='postal_code_ship' className='p-3'>
						Zip Code
					</label>
					<input
						type='text'
						id='postal_code_ship'
						defaultValue={originalData.shipping.address && originalData.shipping.address.postal_code}
						name='postal_code_ship'
						placeholder='00000'
						className='transition-all p-3 rounded-xl w-full outline-none focus:ring focus:ring-yellow-300'
					/>
					<button
						className='transition-all p-3 bg-green-400 rounded-xl hover:bg-green-200'
						onClick={() => {
							setSameAsShip(true);
						}}
					>
						Use Same Address for Shipping
					</button>
				</div>
			)}
			<button className='transition-all p-3 bg-green-400 rounded-xl hover:bg-green-200'>Submit</button>
		</form>
	);
}
