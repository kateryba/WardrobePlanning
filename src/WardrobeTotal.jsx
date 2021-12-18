import React, { useState } from 'react';
import useFetch, { ClothesDataQueryParams } from './sdk/FetchingHelper';
import FetchingState from './sdk/FetchingState';
import ClothesItemGeneral from './Wardrobe/ClothesItemGeneral';

function WardrobeTotal(props) {
    const [clothes, setClothes] = useState([]);
    const [ownersList, setOwnersList] = useState(props.listOwners);

    const fetchingState = useFetch(new ClothesDataQueryParams(), setClothes);

    if (fetchingState === FetchingState.error) {
        return <p>error while getting owners list.</p>;
    }
    if (fetchingState === FetchingState.loading) {
        return <span>loading owners...</span>;
    }

    function handleCIDelete(idx) {
        let updatedClothes = clothes.map((clothesItem, index) => {
            if (index === idx) {
                clothesItem = undefined;
            }
            return clothesItem;
        });
        setClothes(updatedClothes);
    };

    function handleCICreate() {
        if (clothes) {
            let updatedClothes = Array.from(clothes);
            updatedClothes.push({ id: -1 });
            setClothes(updatedClothes);
        }
    };

    function getCIUpdate(CItemUpdate) {
        if (CItemUpdate) {
            let updatedCItem = clothes.map(clothesItem => {
                if (clothesItem.id === CItemUpdate.id) {
                    clothesItem = CItemUpdate;
                }
                return clothesItem;
            })
            setClothes(updatedCItem);
        }
    };

    let result = clothes;
    let owners = ownersList;

    function filterClothes(e, clothes) {
        e.preventDefault();
        if (e) {
            //let size = owners.filter(owner => owner.)
            result = result.filter(ClothesItem => (ClothesItem.owner === e))
        }
    };

    if (clothes) {    
        return (
            <div>
                Select the user:
                <select onChange={filterClothes}>
                    {owners.map(owner => <option>{owner.name}</option>)}
                </select>
                <div class="flex-container, card">
                    <div class="flex-container">
                        {result.map((ClothesItem, index) => {
                            if (ClothesItem !== undefined) {
                                return <MemoClothesItemGeneral key={index} data={ClothesItem} listOwners={props.listOwners}
                                    onDelete={handleCIDelete}
                                    onCreate={handleCICreate}
                                    onUpdate={getCIUpdate}
                                    index={index}
                                />;
                            }
                        }
                        )}
                        <div>
                            <input className="addClothesButton" type='button' value='Add New Clothes'
                                onClick={handleCICreate} />
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
    else { return (<div>NO CLOTHES DATA LOADED</div>); }
};

const MemoClothesItemGeneral = React.memo(ClothesItemGeneral);

export default WardrobeTotal;