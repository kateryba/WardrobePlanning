import React, { useState } from 'react';
import useFetch, { AddClothesParams } from './sdk/FetchingHelper';
import FetchingState from './sdk/FetchingState';
import { ClothItemEditor } from './AddClothesItemComponent';


function AddClothesItem() { 
    const [clothSettings, setClothSettings] = useState(undefined);

    const fetchingState = useFetch(new AddClothesParams(), setClothSettings);

    if (fetchingState === FetchingState.error) {
        return <p>error while getting owners list.</p>;
    }
    if (fetchingState === FetchingState.loading) {
        return <span>loading owners...</span>;
    }    

    return (
        <div>
            {(clothSettings) ? <ClothItemEditor data={clothSettings}/> : <h1>NOSETTINGS</h1>}
        </div>
    );
}

export default AddClothesItem;