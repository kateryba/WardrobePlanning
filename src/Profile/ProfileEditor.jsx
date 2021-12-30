import React, { useState} from 'react';
import axios from 'axios';
import SendingState from '../sdk/SendingState';

function ProfileEditor(props) {

    const [id, setID] = useState(props.data.id);
    const [name, setName] = useState(props.data.name ?? props.data.name);
    const [age, setAge] = useState(props.data.age ?? props.data.age);
    const [size, setSize] = useState(props.data.size ?? props.data.size);
    const [sendingState, setSendingState] = useState(SendingState.Idle);

    const sizeList = [50, 56, 62, 68, 74, 80, 86, 92, 98, 104, 5, 6, 7, 8, 10, 12, 14, 16, 0];

    async function sendDataOnServer(url, data, method) {
        let timeout = setTimeout(() => setSendingState(SendingState.Sending), 1000);
        try {
                //editing existing
            if (method === 'put') {
                await axios.put(url, data); // result.status
                handleUpdate(data);
            }
                //adding new user
            else if (method === 'post') {
                let result = await axios.post(url, data);
                data.id = result.data;
                handleCreate(data);
            }
            setSendingState(SendingState.Idle);
        }
        catch (error) {
            console.log("ERROR DURING SENDING ON SERVER"+JSON.stringify(error));
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

    function handleUpdate(data) {
        props.onUpdate(data);
    }

    function handleCreate(data) {
        props.onCreate(data);
    }

    function handleCancel() {
        props.onCancel(props.index);
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

    // 'stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript'
    function makename(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    return (
        <form className="flex-container, cardEditing">
            <label>
                Name:
                <input type='Text' name='name' placeholder={name === '' ? 'Type name' : name}
                    onChange={e => validateName(e.target.value)} value={name}/>
            </label>
            <br/>
            <label>
                Set current age:
                <input type='number' name='age' min = "0" max = "18" placeholder={age === 0 ? 'Age' : age}
                    onChange={e => validateAge(e.target.value)} value={age}/>
            </label>
            <br/>
            <label>
                Set current size:
                <select type='Text' name='size' placeholder={size === 0 ? 'Size' : size}
                    onChange={e => validateSize(e.target.value)} value={size}>
                    {sizeList.map(size => <option>{size}</option>)}
                </select>
            </label>
            <input type='Button' onClick={handleSubmit} value="Save changes" readOnly/>
            <input type="Submit" onClick={handleCancel} value="Cancel" readOnly />
        </form>
    );
};

export default ProfileEditor;

