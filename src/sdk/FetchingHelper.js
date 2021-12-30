import { useState, useEffect } from 'react';
import axios from 'axios';
import FetchingState from './FetchingState';

class UserDataQueryParams {
    constructor() { }
    get url() { return `https://localhost:44355/family`; }
    get discriminator() { return []; }
}
class ClothesDataQueryParams {
    constructor() { }
    get url() { return `https://localhost:44355/cloth`; }
    get discriminator() { return []; }
}

class ClothesParams {
    constructor() { }
    get url() { return 'https://localhost:44355/settings'; }
    get discriminator() { return []; }
}


function useFetch(dataQueryParams, setData) {
    const [fetchingState, setFetchingState] = useState(FetchingState.Idle);

    useEffect(
        () => {
            loadDataFromServer(dataQueryParams);
        },
        dataQueryParams.discriminator
    );

    async function loadDataFromServer(queryParams) {
        console.log(`loadDataFromServer(${JSON.stringify(queryParams)})`);
        let url = new URL(queryParams.url);
        //console.log(url);

        let timeout = setTimeout(() => setFetchingState(FetchingState.Loading), 1000)
        try {
            const result = await axios.get(url);
            setData(result.data);
            setFetchingState(FetchingState.Idle);
        }
        catch (error) {
            setData();
            setFetchingState(FetchingState.Error);
        }
        clearTimeout(timeout);
    }

    return fetchingState;
}

export { UserDataQueryParams };
export { ClothesDataQueryParams };
export { ClothesParams };
export default useFetch;
