import React, { useState} from 'react';
import axios from 'axios';
import SendingState from '../sdk/SendingState';

function FMEditor(props) {

    const [id, setID] = useState(props.data.id);
    const [name, setName] = useState(props.data.name);
    const [age, setAge] = useState(props.data.age);
    const [size, setSize] = useState(props.data.size);
    const [sendingState, setSendingState] = useState(SendingState.Idle);

    async function sendDataOnServer(url, data, method) {
        let timeout = setTimeout(() => setSendingState(SendingState.Sending), 1000);
        try {
                //adding new user
            if (method === 'post') {
                let result = await axios.post(url, data);
                data.id = result.data;
                handleSave(data);
            }
                //editing existing
            else if (method === 'put') {
                await axios.put(url, data); // result.status
                handleSave(data);
            }
            setSendingState(SendingState.Idle);
        }
        catch (error) {
            console.log("ERROR DURING SENDING ON SERVER");
            setSendingState(SendingState.Error);
        }
        clearTimeout(timeout);
        
        return SendingState;
    };
    function handleSubmit(e) {
        e.preventDefault();
        if (name && age && size) {
            let familyMemberData = { id: id, name: name, age: parseInt(age), size: parseInt(size) };
            if (props.data.id !== -1) {
                let url = new URL(`https://localhost:44355/family/edit/` + props.data.id);
                sendDataOnServer(url, familyMemberData, 'put');
            }
            else {
                let url = new URL(`https://localhost:44355/family/add`);
                sendDataOnServer(url, familyMemberData, 'post');
            };
        }
        else {
            console.log("notification that data input is incorrect");
            //this part should also include data validation and flash notifications if data input is incorrect;
        };
    };

    function handleSave(data) {
        props.onSave(data);
    }

    function handleCancel() {
        props.onCancel();
    }

    function validateName(name) {
        setName(name);
    }
    function validateAge(age) {
        setAge(age);
    }
    function validateSize(size) {
        setSize(size);
    }

    return (
        <form className="cardEditing">
            <label>
                Name:
                <input type='Text' name='name' placeholder={name ? name : 'Name'}
                    onChange={e => validateName(e.target.value)} required />
            </label>
            <br/>
            <label>
                Set current age:
                <input type='Text' name='age' placeholder={age ? age : 'Age'}
                    onChange={e => validateAge(e.target.value)} required />
            </label>
            <br/>
            <label>
                Set current size:
                <input type='Text' name='size' placeholder={size ? size : 'Type size'}
                    onChange={e => validateSize(e.target.value)} required />
            </label>
            <input type='Button' onClick={handleSubmit} value="Save changes" readOnly/>
            {(props.data.name && (props.data.age || props.data.size) !== '') ? <input type="Submit" onClick={handleCancel} value="Cancel" readOnly />
                : <p></p>}
        </form>
    );
};
export default FMEditor;

