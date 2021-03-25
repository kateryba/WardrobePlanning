import React from 'react';
import clothesItem from "./clothesItem"

function ClothesMissing() {
    return (
        <div>
            <div id="clothesMissing"
                class="flex-container"
                ondrop="drop_handler(event)"
                ondragover="dragover_handler(event)">
                <clothesItem /*PROPS FOR THE ITEM*/ />
            </div>
        </div>
)
}
export default ClothesMissing;