import React, { useState } from 'react';
import axios from 'axios';
import SendingState from '../sdk/SendingState';

function ClothesItemViewer(props) {

    const [sendingState, setSendingState] = useState(SendingState.Idle);

    async function deleteItemOnServer(id) {
        let timeout = setTimeout(() => setSendingState(SendingState.Sending), 1000);
        let result;
        let url = new URL(`https://localhost:44355/cloth/delete/` + id);
        try {
            result = await axios.delete(url); // result.status
            if (result.status === 200) {
                props.onDelete();
            }
            setSendingState(SendingState.Idle);
        }
        catch (error) {
            console.log("ERROR DURING SENDING ON SERVER", error);
            setSendingState(SendingState.Error);
        }
        clearTimeout(timeout);
        return SendingState;
    };
    function handleEdit() {
        props.onEdit();
    };
    function deleteItem(e) {
        e.preventDefault();
        deleteItemOnServer(props.data.id);
    };

    return (
        <div>
            <div>type:{props.data.type}  color:{props.data.color}</div>
            <div>size:{props.data.size} owner:{props.data.owner} season:{props.data.season}</div>
            <input type='button' onClick={handleEdit} value="Edit" />
            <input type='button' value='Delete This Item' onClick={deleteItem} />
        </div>             
            );
}

export default ClothesItemViewer;
