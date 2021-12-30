import React, { useState } from 'react';
import useFetch, { ClothesDataQueryParams } from './sdk/FetchingHelper';
import FetchingState from './sdk/FetchingState';
import ClothesItemGeneral from './Wardrobe/ClothesItemGeneral';

function WardrobeTotal(props) {
    const [clothes, setClothes] = useState([]);
    const [filter, setFilter] = useState();

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

    function handleCICreate(CItemUpdate) {
        let addedNewCI = clothes.map(cloth => {
            if (cloth?.id === -1) {
                return CItemUpdate;
            }
            return cloth;
        }
        );
        setClothes(addedNewCI);
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

    function handleAddCIPlaceholder() {
        if (clothes) {
            let updatedClothes = Array.from(clothes);
            updatedClothes.push({ id: -1 });
            setClothes(updatedClothes);
        }
    };
    
    function shouldShow(cloth) {
        if ((filter) && (filter !== 'All')) {
            if (cloth) {
                return cloth.owner === filter;
            }
        }
        return true;
    };

    function ShouldAdd(cloth) {
        for (let i = cloth.length-1; i >= 0; i--) {
            if (cloth[i]) {
                if (cloth[i].id === -1) {
                    return false;
                };
            };
        }
        return true;
    }

    if (clothes) {    
        return (
            <div>
                <div class="flex-container, filter">
                    Select the user:
                    <select type='Text' name='selectedOwner' placeholder={filter ? 'All' : filter}
                        onChange={e => setFilter(e.target.value)} value={filter}>
                        <option>All</option>
                        {props.listOwners.map(owner => {
                            if (owner) {
                                return (<option>{owner.name}</option>)
                            }
                        })
                        }
                    </select>
                </div>
                <div class="flex-container, card">
                    <div style={ShouldAdd(clothes) ? {} : { display: "none" }}>
                        <input style={ShouldAdd(clothes) ? {} : { display: "none" }} className="addClothesButton" type='button' value='Add New Clothes'
                            onClick={handleAddCIPlaceholder} />
                    </div>
                    <div class="flex-container">
                        {clothes.map((cloth, index) => {
                            if (cloth !== undefined) {
                                return <div style={shouldShow(cloth) ? {} : { display: "none" }}><MemoClothesItemGeneral key={index} data={cloth} listOwners={props.listOwners}
                                    onDelete={handleCIDelete}
                                    onCreate={handleCICreate}
                                    onUpdate={getCIUpdate}
                                    index={index}
                                /></div>;
                            }
                        }
                        )}
                    </div>
                </div>
            </div>
        )
    }
    else { return (<div>NO CLOTHES DATA LOADED</div>); }
};

const MemoClothesItemGeneral = React.memo(ClothesItemGeneral);

export default WardrobeTotal;