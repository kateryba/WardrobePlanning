import React from 'react';
import clothesItem from './clothesItem'


function SeasonPile(props) {

        return (
            <div id="clothesOnShelf"
                class="flex-container"
                ondrop="drop_handler(event)"
                ondragover="dragover_handler(event)"
            >
                <clothesItem /*PROPS FOR THE ITEM*/ />
            </div>
        );
}

export default SeasonPile;
