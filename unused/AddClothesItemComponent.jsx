import React, { useState } from 'react';
//import FetchingState from './sdk/FetchingState';


function ClothItemEditor(props) {

	const [id, setID] = useState(undefined);
	const [type, setType] = useState("");
	const [owner, setOwner] = useState("");
	const [size, setSize] = useState(null);
	const [color, setColor] = useState("");
	const [season, setSeason] = useState("");
	const [fitType, setFitType] = useState("");
	const [style, setStyle] = useState("");

	// Verifies whether the object in editing is new or existing and thus initiates ID generation when sent on server
	function clothesItemID(id) {
		if (id === undefined) {
			console.log("THE ITEM IS A NEW ONE");
		}
		else { console.log("ITEM's ID IS ", id); };
	};

	function SendClothItemOnServer()
	{
		console.log();
	}

	return (
		(props.data) ?
			<main>
				<form onSubmit={SendClothItemOnServer()}>
					<br />
					<label>
						Owner:
						<br />
						{props.data.owners.map(aName =>
							(<label>
								&emsp;
								<input
									id={aName}
									type='radio'
									name='owner'
									value={aName}
									onChange={(e) => setOwner(e.target.value)}
								/>
								{aName}<br />
							</label>
							)
						)}
					</label>
					<br />
					<label>
						Select the type of the item:&emsp;
						<select
							id="clothType"
							name="type"
							onChange={(e) => setType(e.target.value)}
						>
							{props.data.types.map(aType => (<option>{aType}</option>))}
						</select>
					</label>
					<br />
					<label>
						Select the size:&emsp;
						<select
							id="clothSize"
							name="size"
							onChange={(e) => setSize(e.target.value)}
						>
							{props.data.sizes.map(aSize => (<option>{aSize}</option>))}
						</select>
					</label>
					<br />
					<label>
						Season:&emsp;
						<select
							id="clothSeason"
							name="season"
							onChange={(e) => setSeason(e.target.value)}
						>
							{props.data.seasons.map(aSeason => (<option>{aSeason}</option>))}
						</select>
					</label>
					<br />
					<label>
						Fit Type:&emsp;
						<select
							id="clothFit"
							name="fit"
							onChange={(e) => setFitType(e.target.value)}
						>
							{props.data.fitTypes.map(aFitType => (<option>{aFitType}</option>))}
						</select>
					</label>
					<br />
					<label>
						Color:&emsp;
						<select
							id="clothColor"
							name="color"
							onChange={(e) => setColor(e.target.value)}
						>
							{props.data.colors.map(aColor => (<option>{aColor}</option>))}
						</select>
					</label>
					<br />

					<label>
						Style:&emsp;
						<select
							id="clothStyle"
							name="style"
						onChange={(e) => setStyle(e.target.value)}
						>
							{props.data.styles.map(aStyle => (<option>{aStyle}</option>))}
						</select>
					</label>
					<br />
					<br />
					<button type="Submit" className="submitNewClothesItem" onClick={clothesItemID(id)}>
						Add to Wardrobe
					</button>
					&emsp;
					<button type="button" className="closePane">
						Cancel
					</button>
				</form>
				<hr />
				<p>Owner's name: {owner}</p>
				<p>Type of clothes: {type}</p>
				<p>Size:{size}</p>
				<p>Style:{style}</p>
				<p>Season:{season}</p>
				<p>Color:{color}</p>
				<p>Fit type:{fitType}</p>
			</main>
			: <h1>Loading settings...</h1>
	)
}
export { ClothItemEditor };
