import React from "react";
import axios, { CancelToken, isCancel } from "axios";

const memoizedStorage = {};

export const useAxios = ({ memoized = false, path }) => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        if (memoized && memoizedStorage.hasOwnProperty(path)) {
            memoizedStorage[path].then(res => {
                setData(res.data);
            });

            return;
        }

        const source = CancelToken.source();

        const promise = axios
            .get(path, {
                cancelToken: source.token
            })
            .then(res => {
                setData(res.data);
                return res;
            })
            .catch(e => {
                if (isCancel(e)) {
                    return;
                }
                throw e;
            });

        if (memoized) {
            memoizedStorage[path] = promise;
        }

        return () => {
            source.cancel();
        };
    }, [memoized, path]);

    return {
        data,
        loading: data === null
    };
};
