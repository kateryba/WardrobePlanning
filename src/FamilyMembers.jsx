import React, { useState } from 'react';
import useFetch, { UserDataQueryParams } from './sdk/FetchingHelper';
import FetchingState from './sdk/FetchingState';
import FMGeneral from './FamilyMember/FMGeneral';

function FamilyMembers(props) {
    const [wardrobeOwners, setWardrobeOwners] = useState([]);

    const fetchingState = useFetch(new UserDataQueryParams(), setWardrobeOwners);

    if (fetchingState === FetchingState.error) {
        return <p>error while getting owners list.</p>;
    }
    if (fetchingState === FetchingState.loading) {
        return <span>loading owners...</span>;
    }
    function handleCreate() {
        if (wardrobeOwners) {
            let updatedWardrobeOwners = Array.from(wardrobeOwners);
            // Array.from(wardrobeOwners), wardrobeOwners.slice(), updatedWardrobeOwners);
            updatedWardrobeOwners.push({ id: -1, name: '', age: 0, size: 0 });
            setWardrobeOwners(updatedWardrobeOwners);
        }
    }

    // TEST UPDATES ON SERVER

    function getDataUpdate(profileUpdate) {
        if (profileUpdate) {
            let updatedWardrobeOwners = wardrobeOwners.map(wo => {
                if (wo.name === profileUpdate.name){
                    wo = profileUpdate;
                }
                return wo;
            })
            setWardrobeOwners(updatedWardrobeOwners);
        }
    }

    function handleProfileDelete(idx) {
        let updatedWardrobeOwners = wardrobeOwners.map((wo, index) => {
            if (index === idx) {
                wo = undefined;
            }
            return wo;
        });
        setWardrobeOwners(updatedWardrobeOwners);
    };
  
    if (wardrobeOwners) {
        console.log(wardrobeOwners);
        return (
            <div>
                <header></header>
                <div className="container">
                    {wardrobeOwners.map((wardrobeOwner, index) => {
                        if (wardrobeOwner !== undefined) {
                            return <MemoFMGeneral key={index} data={wardrobeOwner}
                                onDelete={handleProfileDelete}
                                onCreate={handleCreate}
                                onUpdate={getDataUpdate}
                                index={index} 
                            />;
                        }
                    }
                    )}
                    <div>
                        <input className="createProfileButton" type='button' value='Create Family Member'
                            onClick={handleCreate}/>
                    </div>
                </div>
                <footer></footer>
            </div>
        );
    }
    else { return (<div>NO DATA LOADED</div>); }
}

const MemoFMGeneral = React.memo(FMGeneral);

export default FamilyMembers;

