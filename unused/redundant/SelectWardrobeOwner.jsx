import React from 'react';
import { useState } from 'react';
import useFetch, { UserDataQueryParams } from './sdk/FetchingHelper';
import FetchingState from './sdk/FetchingState';
import EditWardrobeOwner from './EditWardrobeOwner';


//This select operator is for selection of wardrobe owner
function SelectWardrobeOwner(props) {
    const [wardrobeOwners, setWardrobeOwners] = useState([]);

    const fetchingState = useFetch(new UserDataQueryParams(), setWardrobeOwners);

    function handleChange(event) {
        let size = (wardrobeOwners.find(({name}) => name === event.target.value)).size;
        props.onChange(event.target.value, size);
        console.log("handleChange Return : " + event.target.value, event.target.size, event.target.id)
    }

    if (fetchingState === FetchingState.error) {
        return <p>error while getting owners list.</p>;
    }
    if (fetchingState === FetchingState.loading) {
        return <span>loading owners...</span>;
    }

    if (wardrobeOwners) {
        return (
            <div>
                <select value={props.defaultValue ? props.defaultValue : 'Wardrobe owner'} onChange={handleChange} >
                    <option disabled>Wardrobe owner</option>
                    {wardrobeOwners.map((person, i) => {
                        const childID = "child" + i;
                        return (
                            <option key={childID} id={childID}> {person.name} </option>
                        );
                    }
                    )}
                </select>
                <h4 id='editWardrobeOwner'
                    onClick={<EditWardrobeOwner data={wardrobeOwners}
                    selected={props.defaultValue ? props.defaultValue : 'Wardrobe owner'} />}
                >
                    Edit personal profile details
                </h4>
>
            </div>
        );
    }
    else { return (<div> </div>);}
    
}
export default SelectWardrobeOwner;
