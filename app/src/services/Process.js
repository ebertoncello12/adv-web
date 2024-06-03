import {ApiAuth} from '../Api/Config/axios.js';

let loadingContext = null;

export function setLoadingContextProcess(context) {
    loadingContext = context;
}

async function getProcess(queryParams) {
    if (loadingContext) loadingContext.setIsLoading(true);

    try {
        let url = '/process';
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

async function registerProcess(requestBody) {
    if (loadingContext) loadingContext.setIsLoading(true);
    try {
        const response = await ApiAuth.post('/process',requestBody);
        const data = response.data;
        return data;
    } catch (error) {
        throw error.response.data;
    } finally {
        if (loadingContext) loadingContext.setIsLoading(false);
    }
}

export { getProcess, registerProcess };
