import React, { useState } from 'react';
import axios from 'axios';
import SendingState from '../sdk/SendingState';

function ClothesItemEditor(props) {

    const [id, setID] = useState(props.data.id);
    const [size, setSize] = useState(props.data.size ?? 0);
    const [type, setType] = useState(props.data.name ?? 'Unknown');
    const [owner, setOwner] = useState(props.data.owner ?? 'Unowned');
    const [color, setColor] = useState(props.data.color ?? 'unknown');
    const [season, setSeason] = useState(props.data.season ?? 'Unknown');
    const [sendingState, setSendingState] = useState(SendingState.Idle);

    const sizes = [50, 56, 62, 68, 74, 80, 86, 92, 98, 104, 5, 6, 7, 8, 10, 12, 14, 16, 0];
    const types = ["Top", "Bottom", "Overall", "Shoes", "Accessories", "Unknown"];
    const colors = ["red", "orange", "yellow", "chartreuse green", "green", "spring green", "cyan", "azure", "blue", "violet", "magenta", "rose", "white", "black", "unknown"];
    const seasons = ["summer", "winter", "autumn-spring", "Unknown"];
    const owners = props.listOwners;

    console.log(owners);

    async function sendDataOnServer(url, data, method) {
        let timeout = setTimeout(() => setSendingState(SendingState.Sending), 1000);
        try {
            //editing existing
            if (method === 'put') {
                await axios.put(url, data); // result.status
                handleUpdate(data);
            }
            //adding new clothes item
            else if (method === 'post') {
                let result = await axios.post(url, data);
                data.id = result.data;
                handleCreate(data);
            }
            setSendingState(SendingState.Idle);
        }
        catch (e) {
            console.log("ERROR DURING SENDING ON SERVER" + JSON.stringify(e));
            setSendingState(SendingState.Error);
        }
        clearTimeout(timeout);

        return SendingState;
    };
    function handleSubmit(e) {
        e.preventDefault();
        if (color && size && type) {
            let ClothesItemData = { id: id, size: parseInt(size), type: type, owner: owner, color: color, season: season};
            if (props.data.id !== -1) {
                let url = new URL(`https://localhost:44355/cloth/edit/` + props.data.id);
                sendDataOnServer(url, ClothesItemData, 'put');
            }
            else {
                let url = new URL(`https://localhost:44355/cloth/add`);
                sendDataOnServer(url, ClothesItemData, 'post');
            };
        }
        else {
            let missingInput = '';
            if (!color) {
                missingInput += 'color ';
            }
            if (!size) {
                missingInput += 'size ';
            }
            if (!type) {
                missingInput += 'type ';
            }
            console.log('notification that ' + missingInput + 'data is incorrect');
        };
    };

    function handleUpdate(data) {
        props.onUpdate(data);
    }

    function handleCreate(data) {
        props.onCreate(data);
    }

    function handleCancel() {
        props.onCancel(props.index);
    }

    function validateSize(size) {
        setSize(size);
    }
    function validateType(type) {
        setType(type);
    }
    function validateOwner(owner) {
        //for (let i = 0; i < owners.length; i++) {
        //    if (owners[i].name === owner) {
                
        //        break;
        //    }
        //}
        setOwner(owner);
    }
    function validateColor(color) {
        setColor(color);
    }
    function validateSeason(season) {
        setSeason(season);
    }

    return (
        <form className="cardEditing">
            <label>
                Size:
                <select name='size' placeholder={size === '' ? 'Size' : size}
                    onChange={e => validateSize(e.target.value)} value={size}>
                    {sizes.map(size => <option>{size}</option>)}
                </select>
            </label>
            <br />
            <label>
                Type:
                <select name='type' placeholder={type === 0 ? 'Type' : type}
                    onChange={e => validateType(e.target.value)} value={type}>
                   {types.map(type => <option>{type}</option>)}
                </select>
            </label>
            <br />
            <label>
                Owner:
                <select name='owner' placeholder={owner === 0 ? 'Owner' : owner}
                    onChange={e => validateOwner(e.target.value)} value={owner}>
                    <option></option>
                    {owners.map(owner => {
                        if (owner) {
                            return (<option>{owner.name}</option>);
                        }
                        }
                    )}
                </select>
            </label>
            <br />
            <label>
                Color:
                <select name='color' placeholder={color === 0 ? 'Color' : color}
                    onChange={e => validateColor(e.target.value)} value={color}>
                    {colors.map(color => (<option>{color}</option>))}
                </select>
            </label>
            <br />
            <label>
                Season:
                <select name='season' placeholder={season === 0 ? 'Season' : season}
                    onChange={e => validateSeason(e.target.value)} value={season}>
                    {seasons.map(season => <option>{season}</option>)}
                </select>
            </label>
            <input type='Button' onClick={handleSubmit} value="Save changes" readOnly />
            <input type="Submit" onClick={handleCancel} value="Cancel" readOnly />
        </form>
    );

	return('THIS WILL PROVIDE AN OPPORTUNITY TO CREATE NEW Items WITH MULTIOPTIONAL SELECTS FOR COLORS AND SIZES'); 

}
export default ClothesItemEditor;




