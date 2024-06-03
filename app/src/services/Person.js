import {ApiAuth} from '../Api/Config/axios.js';

let loadingContext = null;

export function setLoadingContextUser(context) {
    loadingContext = context;
}

async function getUserDetails() {
    if (loadingContext) loadingContext.setIsLoading(true);

    try {
        const response = await ApiAuth.get('/user');
        const data = response.data;
        return data;
    } catch (error) {
        throw error.response.data;
    } finally {
        if (loadingContext) loadingContext.setIsLoading(false);
    }
}

async function updatePersonDetails(requestBody) {
    if (loadingContext) loadingContext.setIsLoading(true);

    try {
        const response = await ApiAuth.put('/user', requestBody);
        const data = response.data;
        return data;
    } catch (error) {
        throw error.response.data;
    } finally {
        if (loadingContext) loadingContext.setIsLoading(false);
    }
}

async function deletePersonAccount(reason) {
    if (loadingContext) loadingContext.setIsLoading(true);

    try {
       await ApiAuth.post('/user/cancel', reason);
    } catch (error) {
        throw error.response.data;
    } finally {
        if (loadingContext) loadingContext.setIsLoading(false);
    }
}

export { getUserDetails, updatePersonDetails };
