import React, { useState } from 'react';
import axios from './axios';
import SendingState from './sdk/SendingState';


function EditWardrobeOwner(props) {

	console.log("WRITE THE PART WITH " + props.data + props.DefaultValue);

	const [ownerID, setOwnerID] = useState(undefined);
	const [ownerName, setOwnerName] = useState(undefined);
	const [ownerAge, setOwnerAge] = useState(undefined);
	const [ownerSize, setOwnerSize] = useState(undefined);

	//if (props.defaultValue !== 'Wardrobe owner')
	//{
	//	props.data.map(profile => {
	//		if (profile.owner === props.defaultValue) {
	//			setOwnerName(profile[owner]);
	//			setOwnerAge(profile[age]);
	//			setOwnerSize(profile[size]);
	//		};
	//	});
	//};

	const [sendingState, setSendingState] = useState(SendingState.Idle);

	function handleSubmit() {
		if (ownerName && ownerAge && ownerSize) {
			let profileData = { name: ownerName, age: ownerAge, size: ownerSize };
			let url = new URL(`https://localhost:44355/clothes/edit`);
			sendDataOnServer(url, profileData);
		}
		else {

		}		
	};

	async function sendDataOnServer(url, submitData) {
		console.log(`sendDataOnServer(${JSON.stringify(queryParams)})`);
		console.log(url);

		let timeout = setTimeout(() => setSendingState(SendingState.Sending), 1000);
		try {
			await axios.post(url, submitData);
			setSendingState(SendingState.Idle);
		}
		catch (error) {
			console.log("ERROR DURING SENDING ON SERVER");
			setSendingState(SendingState.Error);
		}
		clearTimeout(timeout);
		return SendingState;
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					Change name:
					<select
						id="ownerNameEdit"
						name="name"
						onChange={(e) => setOwnerName(e.target.value)} >
							<option disabled>Wardrobe owner</option>
						{props.data.owners.map(aName => (
							<option selected={ownerName === aName ? true : false}>{aName}</option>))}
					</select>
				</label>
				<label>
					Change age:
					<select
						id="ownerAgeEdit"
						name="age"
						onChange={(e) => setOwnerAge(e.target.value)}
					>
						{props.data.age.map(anAge => (
							<option selected={ownerAge === anAge ? true : false}>{anAge}</option>))}
					</select>
				</label>
					<br />
				<label>
					Select the type of the item:&emsp;
					<select
						id="ownerSizeEdit"
						name="size"
						onChange={(e) => setOwnerSize(e.target.value)}
					>
						{props.data.size.map(aSize => (
							<option selected={ownerSize === aSize ? true : false}>{aSize}</option>))}
					</select>
				</label>
				<br />
				<button>Save profile changes</button>
				<button>Cancel</button>
			</form>
		</div>
    )
}

export default EditWardrobeOwner;



