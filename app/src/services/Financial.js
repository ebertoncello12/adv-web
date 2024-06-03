import {ApiAuth} from "../Api/Config/axios.js";

let loadingContext = null;

function setLoadingContextFinancial(context) {
    loadingContext = context;
}

async function getPaymentHistory(queryParams) {
    if (loadingContext) loadingContext.setIsLoading(true);

    try {
        let url = '/payment/history';
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

async function getPlan() {
    if (loadingContext) loadingContext.setIsLoading(true);

    try {
        const response = await ApiAuth.get('/plan/actual');
        const data = response.data;
        return data;
    } catch (error) {
        throw error.response.data;
    } finally {
        if (loadingContext) loadingContext.setIsLoading(false);
    }
}

export { getPaymentHistory, getPlan };
