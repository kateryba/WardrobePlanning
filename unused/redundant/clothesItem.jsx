import React from 'react';
import itemsDragNDrop from "./itemsDragNDrop"

/*the item has to have owner, season, size, color*/


function clothesItem(props) {
        return(
            <figure id="tShirt4"
                draggable="true"
                ondragstart="dragstart_handler(event)"
            >
                <img draggable="false" src="../public/tShirtBlock.png"/>
                    <figcaption>Here will be custom name</figcaption>
            </figure>
        );
}
export default clothesItem;