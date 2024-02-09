import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setLoading('Loading');
            setError(null);
            setData(null);
            
            try {
                const res = await fetch(url);
                setData(res.json());
                console.log('hi');
            } catch (error) {
                setError('Error occurred');
            }
            setLoading(false);
        }
        getData();
    }, [url]);
    
    return { loading, error, data };
}


export default useFetch;