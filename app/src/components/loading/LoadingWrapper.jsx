import React from 'react';
import { useLoading } from '../../hooks/LoadingContext.jsx';
import { setLoadingContext } from '../../services/Authenticator.js';
import { setLoadingContextHome } from '../../services/Home.js';
import {setLoadingContextProcess} from "../../services/Process.js";

const LoadingWrapper = ({ children }) => {
    const loadingContext = useLoading();

    React.useEffect(() => {
        setLoadingContext(loadingContext);
    }, [loadingContext]);

    React.useEffect(() => {
        setLoadingContextHome(loadingContext);
    }, [loadingContext]);

    React.useEffect(() => {
        setLoadingContextProcess(loadingContext);
    }, [loadingContext]);


    return children;
};

export default LoadingWrapper;
