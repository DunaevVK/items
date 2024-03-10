import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const fetching = async (...args) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e) {
            if (e.response.status === 500) {
                console.log('Ошибочка вышла','This is error', e.response.status, e.message)
                fetching(...args)
            }
            setError(e.message)
            setIsLoading(true)
        }
        finally {
            setIsLoading(false)
        }
    }
    return [fetching, isLoading, error]
}