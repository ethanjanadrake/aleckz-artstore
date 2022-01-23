import ProgressBar from './ProgressBar';
import firebase from '../lib/firebase';
import 'firebase/firestore';
import { useState, useRef } from 'react';
import path from 'path';

export default function UploadForm(props) {
	// make a list of all the names of stored images so if there ends up being duplicates, a different name will be used on upload
	const storageRef = firebase.storage().ref('art');
	const storageNames = [];
	storageRef
		.listAll()
		.then((res) => {
			res.items.forEach((ref) => {
				storageNames.push(path.parse(ref.name).name);
			});
		})
		.catch((error) => console.log(error));

	const priceRef = useRef();
	const fileRef = useRef();
	// fileExport changes only on submit, and a change in this will trigger the ProgressBar to update, thus triggering useStorage, which can trigger an upload
	const [
		fileExport,
		setFileExport
	] = useState(null);
	const [
		fileError,
		setFileError
	] = useState('');

	let originalData = {};
	if (props.originalData) {
		originalData = { ...props.originalData };
	}

	const [
		data,
		setData
	] = useState({ ...originalData });

	const [
		file,
		setFile
	] = useState(null);
	const [
		fileName,
		setFileName
	] = useState('');

	const onFileChange = () => {
		let fileInput = fileRef.current.files[0];
		if (
			fileInput &&
			[
				'image/png',
				'image/jpeg'
			].includes(fileInput.type)
		) {
			setFile(fileInput);
			setFileError('');
			let tempFileName = path.parse(fileInput.name).name;
			while (storageNames.includes(tempFileName)) {
				tempFileName = tempFileName + '1';
			}
			setFileName(tempFileName + path.parse(fileInput.name).ext);
		}
		else if (file) {
			setFileError('');
		}
		else {
			setFileError('Please select an image file (png or jpeg)');
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		// take the data from the form inputs and update the data state with any entries that are filled out while keeping anything that was not edited unchanged
		const newData = { ...data };

		for (let i = 0; i < e.target.length; i++) {
			if (
				![
					'file',
					'submit',
					'button'
				].includes(e.target[i].type)
			) {
				if (e.target[i].value) {
					newData[e.target[i].name] = e.target[i].value;
				}
				else if (!e.target[i].value && e.target[i].name === 'stock') {
					delete newData[e.target[i].name];
				}
				else {
					if (e.target[i].name !== 'fileName' && e.target[i].name !== 'stock') {
						setFileError('One or more fields is empty');
						return;
					}
				}
			}
		}

		setData({ ...newData });

		// if there is a file in the file variable, we trigger a useStorage and create a new document
		if (file) {
			const confirmation = confirm('Confirm Upload?');
			if (confirmation) {
				setFileExport(file);
				setFileError('');
			}
		}
		else if (props.originalData) {
			// if this is an edit instead of a new upload, and there is no file edit, then pass the current id so that the correct document can be edited
			const confirmation = confirm('Confirm Changes?');
			if (confirmation) {
				await firebase.firestore().collection('art').doc(props.id).set({ ...newData });
				window.location.reload();
			}
		}
		else {
			// if this is an original upload but there is no file, then throw an error and do nothing
			setFileError('Please select an image file (png or jpeg)');
		}
	};

	return (
		<form onSubmit={onSubmit} className='p-10 bg-gray-100 m-20 mt-10 rounded-lg shadow-lg border-red-500'>
			<div className='grid grid-cols-4 gap-4'>
				<label htmlFor='name' className='p-3'>
					Title
				</label>
				<input
					type='text'
					id='name'
					defaultValue={originalData.name}
					name='name'
					placeholder='Title'
					className='transition-all p-3 rounded-xl w-full outline-none focus:ring focus:ring-yellow-300'
				/>
				<label htmlFor='artist' className='p-3'>
					Artist
				</label>
				<input
					type='text'
					id='artist'
					defaultValue={originalData.artist || 'Aleckzander Martisauskas'}
					name='artist'
					placeholder='Artist Name'
					className='transition-all p-3 rounded-xl w-full outline-none focus:ring focus:ring-yellow-300'
				/>
				<label htmlFor='description' className='p-3'>
					Description
				</label>
				<input
					type='text'
					id='description'
					defaultValue={originalData.description}
					name='description'
					placeholder='Description'
					className='transition-all p-3 rounded-xl w-full outline-none focus:ring focus:ring-yellow-300'
				/>

				<label htmlFor='price' className='p-3'>
					Price
				</label>
				<div className='relative'>
					<div className='absolute left-3 inset-y-0 flex items-center pointer-events-none'>
						<span className='text-gray-500'>$</span>
					</div>
					<input
						type='number'
						defaultValue={originalData.price}
						min='0.01'
						step='0.01'
						name='price'
						placeholder='0.00'
						ref={priceRef}
						onBlur={() => {
							priceRef.current.value = parseFloat(priceRef.current.value).toFixed(2);
						}}
						className='transition-all p-3 rounded-xl block pl-7 w-full outline-none focus:ring focus:ring-yellow-300'
					/>
				</div>
				<label htmlFor='stock' className='p-3'>
					Stock &#40;Leave Blank for Unlimited&#41;
				</label>
				<input
					type='text'
					id='stock'
					defaultValue={originalData.stock}
					name='stock'
					placeholder='Unlimited'
					className='transition-all p-3 rounded-xl w-full outline-none focus:ring focus:ring-yellow-300'
				/>
			</div>
			<input type='hidden' value={fileName} name='fileName' />
			<br />
			<input type='file' id='image' ref={fileRef} onChange={onFileChange} className='hidden' />
			<div className='flex justify-between'>
				<input
					type='button'
					value='Upload Image'
					onClick={() => {
						fileRef.current.click();
					}}
					className='transition-all p-3 bg-blue-400 rounded-xl hover:bg-blue-200'
				/>
				<div>
					{fileError && <div className='p-3 text-red-500'>{fileError}</div>}
					{file && <div className='p-3'>{fileName}</div>}

					{/* the ProgressBar element triggers the useStorage hook, so we pass all the other form data to ProgressBar so useStorage can create a Firestore document that matches the Storage item it is uploading */}
				</div>
				<button className='transition-all p-3 bg-green-400 rounded-xl hover:bg-green-200'>Submit</button>
			</div>
			{fileExport && (
				<ProgressBar
					file={fileExport}
					setFile={setFileExport}
					data={data}
					id={props.id}
					originalFileName={originalData.fileName}
				/>
			)}
		</form>
	);
}
