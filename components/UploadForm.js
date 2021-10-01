import ProgressBar from './ProgressBar';
import firebase from '../firebase/clientApp';
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

	const fileRef = useRef();
	// fileExport changes only on submit, and a change in this will trigger the ProgressBar to update, thus triggering useStorage, which can trigger an upload
	const [
		fileExport,
		setFileExport
	] = useState(null);
	const [
		fileError,
		setFileError
	] = useState(null);

	let originalData = {};
	if (props.originalData) {
		originalData = { ...props.originalData };
	}

	const [
		data,
		setData
	] = useState({ ...originalData });

	const [
		fileName,
		setFileName
	] = useState('');

	const onFileChange = () => {
		let fileInput = fileRef.current.files[0];
		let tempFileName = path.parse(fileInput.name).name;
		while (storageNames.includes(tempFileName)) {
			tempFileName = tempFileName + '1';
		}

		setFileName(tempFileName + path.parse(fileInput.name).ext);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		// take the data from the form inputs and update the data state with any entries that are filled out while keeping anything that was not edited unchanged
		const newData = { ...data };

		for (let i = 0; i < e.target.length; i++) {
			if (e.target[i].type !== 'file' && e.target[i].type !== 'submit') {
				newData[e.target[i].name] = e.target[i].value;
			}
		}

		setData({ ...newData });
		let fileInput = fileRef.current.files[0];

		// if there is a file in the fileInput, we trigger a useStorage and create a new document
		if (
			fileInput &&
			[
				'image/png',
				'image/jpeg'
			].includes(fileInput.type)
		) {
			setFileExport(fileInput);
			setFileError('');
		}
		else if (props.originalData) {
			// if this is an edit instead of a new upload, and there is no file edit, then pass the current id so that the correct document can be edited
			await firebase.firestore().collection('art').doc(props.id).set({ ...newData });
			window.location.reload();
		}
		else {
			// if this is an original upload but there is no file, then throw an error and do nothing
			setFileError('Please select an image file (png or jpeg)');
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<input type='file' ref={fileRef} onChange={onFileChange} />
			<input type='text' defaultValue={originalData.name} name='name' placeholder='name' />
			<input type='text' defaultValue={originalData.artist} name='artist' placeholder='artist' />
			<input type='text' defaultValue={originalData.description} name='description' placeholder='description' />
			<input
				type='number'
				defaultValue={originalData.price}
				min='0.01'
				step='0.01'
				name='price'
				placeholder='0.00'
			/>
			<input type='hidden' value={fileName} name='fileName' />
			<button>Submit</button>
			<div className='output'>
				{fileError && <div className='error'>{fileError}</div>}
				{/* the ProgressBar element triggers the useStorage hook, so we pass all the other form data to ProgressBar so useStorage can create a Firestore document that matches the Storage item it is uploading */}
				{fileExport && (
					<ProgressBar
						file={fileExport}
						setFile={setFileExport}
						data={data}
						id={props.id}
						originalFileName={originalData.fileName}
					/>
				)}
			</div>
		</form>
	);
}
