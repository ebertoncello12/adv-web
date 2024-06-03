import {ApiAuth} from '../Api/Config/axios.js';

let loadingContext = null;

export function setLoadingContextNotification(context) {
    loadingContext = context;
}

async function getNotifications(queryParams) {
    if (loadingContext) loadingContext.setIsLoading(true);

    try {
        let url = '/notification';
        if (queryParams) {
            url += '?' + new URLSearchParams(queryParams).toString();
        }
        const response = await ApiAuth.get(url);
        const data = response.data;
        return data;
    } catch (error) {
        throw error.response.data;
    } finally {
        if (loadingContext) loadingContext.setIsLoading(false);
    }
}


export { getNotifications };
