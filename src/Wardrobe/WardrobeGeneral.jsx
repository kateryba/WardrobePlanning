import React from 'react';
import useFetch, { ClothesDataQueryParams } from './sdk/FetchingHelper';
import FetchingState from './sdk/FetchingState';


function WardrobeGeneral(props) {
    const [wardrobeProfile, setWardrobeProfile] = useState();
    const [wishList, setWishList] = useState([]);
    const [currentWardrobe, setCurrentWardrobe] = useState([]);

    //function downloadwardrobedata(props) {
    //    const fetchingstate = usefetch(new clothesdataqueryparams(), setwardrobeprofile);

    //    if (fetchingstate === fetchingstate.error) {
    //        return <p>error while getting owners list.</p>;
    //    }
    //    if (fetchingstate === fetchingstate.loading) {
    //        return <span>loading owners...</span>;
    //    }
    //    else {
    //        return (wardrobeprofile);
    //    }
    //};

    if (wardrobeProfile) {

    }

    

    //<CurrentWardrobe />
    //<MissingItems />

    return (
        'CURRENT POOL AND MISSING PARTS OF WARDROBE EACH CONTAINING UNCHANGABLE ITEMS and ADD NEW')
}


export default WardrobeGeneral; 