import React from react;
import axios from 'axios';
import SelectWardrobeOwner from './SelectWardrobeOwner'
import { useEffect, useState } from 'react';


function FamilyMembersList() {
    const familyList = [] = SelectWardrobeOwner(props)
    familyList.map( )
}

const FetchingState = Object.freeze({
    Idle: 0,
    Loading: 1,
    Error: 2,
});

//This select operator is for selection of wardrobe owner
function SelectWardrobeOwner() {
    const [postPreviews, setPostPreviews] = useState([]);
    const [fetchingState, setFetchingState] = useState(FetchingState.Idle);

    useEffect(
        () => {
            loadPostsPreviewsFromServer();
        },
        []
    );

    async function loadPostsPreviewsFromServer() {
        let url = new URL("https://localhost:44355/family");
        let timeout = setTimeout(() => setFetchingState(FetchingState.Loading), 1000)
        try {
            const result = await axios.get(url);
            console.log("result is " + JSON.stringify(result));
            console.log(JSON.stringify(result));
            setPostPreviews(result.data);
            setFetchingState(FetchingState.Idle);
        }
        catch (error) {
            console.log(error);
            setPostPreviews(undefined);
            setFetchingState(FetchingState.Error);
        }
        clearTimeout(timeout);
    }

    if (fetchingState === FetchingState.Error) {
        return <p>Error while getting posts list.</p>;
    }
    if (fetchingState === FetchingState.Loading) {
        return <span>Loading...</span>;
    }
    return (
        <div>
            {postPreviews.map(function (item, i) {
                let childID = "child" + i;
                console.log(item);
                return (
                    <div key={i} id={childID}>{item.name}  {item.age}</div>
                );
            })
            }
        </div>

    );
}

export default SelectWardrobeOwner;
