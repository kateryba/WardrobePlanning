import React, { useState } from 'react';
import useFetch, { ClothesDataQueryParams } from './sdk/FetchingHelper';
import FetchingState from './sdk/FetchingState';

function ShowWardrobeProileData(props) {
    const [wardrobeProfile, setWardrobeProfile] = useState();

    const fetchingState = useFetch(new ClothesDataQueryParams(), setWardrobeProfile);

    if (fetchingState === FetchingState.error) {
        return <p>error while getting owners list.</p>;
    }
    if (fetchingState === FetchingState.loading) {
        return <span>loading owners...</span>;
    }

    let ClothesPile = [];

    if (wardrobeProfile) {
        ClothesPile = wardrobeProfile.filter(clothItem => clothItem.owner === props.owner || clothItem.size === props.size)
    };

        return (
            <div>
                <h1>{props.owner}</h1>
                <h3>{props.size} #emsp {props.age}</h3>
                <ul id='clothesList'>
                    {(ClothesPile) ?
                        (ClothesPile.map(clothesItem =>
                            <li id={props.owner + clothesItem.id}>
                                { clothesItem.type } { clothesItem.color } { clothesItem.season}
                            </li>
                        ))
                        : <li>'Nothing Found"</li>
                    }
                </ul>
            </div>
        )
    }

export default ShowWardrobeProileData;
