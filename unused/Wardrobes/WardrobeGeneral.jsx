import React from 'react';
import useFetch, { ClothesDataQueryParams } from './sdk/FetchingHelper';
import FetchingState from './sdk/FetchingState';


function WardrobeGeneral(props) {
    const [wardrobeProfile, setWardrobeProfile] = useState();
    const [wishList, setWishList] = useState([]);
    const [currentWardrobe, setCurrentWardrobe] = useState([]);

    function downloadWardrobeData(props) {
        const fetchingState = useFetch(new ClothesDataQueryParams(), setWardrobeProfile);

        if (fetchingState === FetchingState.error) {
            return <p>error while getting owners list.</p>;
        }
        if (fetchingState === FetchingState.loading) {
            return <span>loading owners...</span>;
        }
        else {
            return (wardrobeProfile);
        }
    };

    if (wardrobeProfile) {

    }

    

    //<CurrentWardrobe />
    //<MissingItems />

    return (
        'CURRENT POOL AND MISSING PARTS OF WARDROBE EACH CONTAINING UNCHANGABLE ITEMS and ADD NEW')
}


export default WardrobeGeneral; 