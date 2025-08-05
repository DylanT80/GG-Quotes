import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refetch = () => {
        setLoading(true);
        setError(null);
        setData(null);

        fetch(url)
        .then(res => res.json())
        .then(res => setData(res))
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }

    useEffect(refetch, [url]);
    
    return { data, loading, error, refetch };
}


export default useFetch;