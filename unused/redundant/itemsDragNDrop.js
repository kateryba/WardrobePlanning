import React from 'react';

export function dragstart_handler(ev) {
    // Add different types of drag data
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

export function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}
export function drop_handler(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("text/plain");
    ev.target.appendChild(document.getElementById(data));
}

