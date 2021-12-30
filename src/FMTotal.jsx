import React, { useState } from 'react';
import useFetch, { UserDataQueryParams } from './sdk/FetchingHelper';
import FetchingState from './sdk/FetchingState';
import ProfileGeneral from './Profile/ProfileGeneral';
import WardrobeTotal from './WardrobeTotal';


function FMTotal(props) {
    const [wardrobeOwners, setWardrobeOwners] = useState([]);
    const [wardrobeContents, setWardrobeContents] = useState([]);

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
            updatedWardrobeOwners.push({ id: -1, name: '', age: 0, size: 0 });
            setWardrobeOwners(updatedWardrobeOwners);
        }
    };

    function handleProfileCreate(profileUpdate) {
        let addedWardrobeOwners = wardrobeOwners.map(wo => {
            if (wo) {
                if (wo.id === -1) {
                    return profileUpdate;
                }
            }
            return wo;
        });
        setWardrobeOwners(addedWardrobeOwners);
    };

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
    };

    function handleProfileDelete(idx) {
        let updatedWardrobeOwners = wardrobeOwners.map((wo, index) => {
            if (index === idx) {
                wo = undefined;
            }
            return wo;
        });
        setWardrobeOwners(updatedWardrobeOwners);
    }; 
  
    if (wardrobeOwners.length) {
        console.log(wardrobeOwners);
        return (
            <div>
                <header></header>
                <div className="flex">
                    {wardrobeOwners.map((wardrobeOwner, index) => {
                        if (wardrobeOwner !== undefined) {
                            return <MemoFMGeneral key={index} data={wardrobeOwner}
                                onDelete={handleProfileDelete}
                                onCreate={handleProfileCreate}
                                onUpdate={getDataUpdate}
                                index={index} 
                            />;
                        }
                    }
                    )}
                    <div>
                        <input className="addProfileButton" type='button' value='Add Family Member'
                            onClick={handleCreate}/>
                    </div>
                </div>
                <footer></footer>
                <div className="flex">
                    <WardrobeTotal listOwners={wardrobeOwners} />
                </div>
            </div>
        );
    }
    else { return (<div>NO USERS DATA LOADED</div>); }
}

const MemoFMGeneral = React.memo(ProfileGeneral);

export default FMTotal;

