import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useFetch, { UserDataQueryParams } from './sdk/FetchingHelper';
import FetchingState from './sdk/FetchingState';


//import ClothItemEditor from './AddClothesItemComponent';
//import ClothItemNew from './AddClothesItemComponent';
//import openEditClothesDialogue from './EditClothes';


function LoadWardrobeProfile(props) {
    //later to be remade for each list to have a separate request
    //const Current = [];
    //const Fits = [];
    //const Wanted = [];
    //const [fetchingState, setFetchingState] = useState(FetchingState.Idle);
    let clothesPile = [];
    console.log('loadWO prps:' + JSON.stringify(props));
    

    async function loadWardrobeProfileFromServer() {
        let url = new URL("https://localhost:44355/cloth");
        //there should be params taken from user profile like name and size
        //while two requests should be made for existing clothes table and for desired(wanted)
        //let timeout = setTimeout(() => setFetchingState(FetchingState.Loading), 1000);
        try {
            const result = await axios.get(url);

            console.log("result is " + JSON.stringify(result));
            console.log(JSON.stringify(result));

            
            //setFetchingState(FetchingState.Idle);
        }
        catch (error) {
            console.log(error);
            clothesPile = undefined;
            //setFetchingState(FetchingState.Error);
        }
        //clearTimeout(timeout);
        return (clothesPile)
    }

    //if (fetchingState === FetchingState.Error) {
    //    return <p>Error while getting owners list.</p>;
    //}
    //if (fetchingState === FetchingState.Loading) {
    //    return <span>Loading owners...</span>;
    //}
    return loadWardrobeProfileFromServer();
}
export default LoadWardrobeProfile;

