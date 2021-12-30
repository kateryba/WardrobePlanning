import React, { useState } from 'react';
import axios from 'axios';
import SendingState from '../sdk/SendingState';
//import WardrobeTotal from '../WardrobeTotal';

function ProfileViewer(props) {

    const [sendingState, setSendingState] = useState(SendingState.Idle);

    async function deleteProfileOnServer(id) {
        let timeout = setTimeout(() => setSendingState(SendingState.Sending), 1000);
        let result;
        let url = new URL(`https://localhost:44355/family/delete/` + id);
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
    function deleteProfile(e) {
        e.preventDefault();
        deleteProfileOnServer(props.data.id);
    };

    console.log(props.data.id);

    return (
        <div class="flex-container, card">
            <h2>{props.data.name}  <input type='button' onClick={handleEdit} value="Edit" /></h2>
            <h5>age:{props.data.age} size:{props.data.size}</h5>
            {/*<WardrobeTotal ownerID={props.data.name}/>*/}
            <input type='button' value='Delete Family Member' onClick={deleteProfile} />
        </div>
    );
}
export default ProfileViewer;
