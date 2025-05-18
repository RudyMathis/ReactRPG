import { useRef, useState, useCallback } from 'react';

export const useGameInput = () => {
    const [waitingForInput, setWaitingForInput] = useState(false);
    const inputPromiseResolverRef = useRef<(() => void) | null>(null);

    const waitForInput = useCallback((): Promise<void> => {
        setWaitingForInput(true);
        return new Promise(resolve => {
            inputPromiseResolverRef.current = resolve;
        });
    }, []);

    const resolveInput = () => {
        setWaitingForInput(false);
        if (inputPromiseResolverRef.current) {
            inputPromiseResolverRef.current();
            inputPromiseResolverRef.current = null;
        }
    };

    return { waitingForInput, waitForInput, resolveInput };
};