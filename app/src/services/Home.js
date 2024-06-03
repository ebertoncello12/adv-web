import {ApiAuth} from '../Api/Config/axios.js';

let loadingContext = null;

export function setLoadingContextHome(context) {
    loadingContext = context;
}

async function home() {
    if (loadingContext) loadingContext.setIsLoading(true);

    try {
        const response = await ApiAuth.get('/dashboard');
        const data = response.data;
        return data;
    } catch (error) {
        throw error.response.data;
    } finally {
        if (loadingContext) loadingContext.setIsLoading(false);
    }
}

export { home };
