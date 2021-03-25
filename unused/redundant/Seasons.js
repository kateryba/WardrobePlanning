import React from 'react';

export function curMonth() {
    let d = new Date();
    return(d.getMonth());
}

export function getSeason(month) {
    if (1 < month < 5) {
        return 2;
    }

    if (4 < month < 8) {
        return 3;
    }

    if (7 < month < 10) {
        return 4;
    }
    return 1;
}

export function seasonName(seasonNum){
    if (seasonNum === 1) {
        return 'Winter';
    }
    if (seasonNum === 2) {
        return 'Spring'
    }
    if (seasonNum === 3) {
        return 'Summer';
    }
    return 'Autumn';
}