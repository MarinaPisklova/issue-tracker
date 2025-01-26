import { useRef, useEffect } from 'react';

export default function useScrollToBottomAction(
    container: HTMLElement | Document | null,
    callback: () => void,
    offset: number = 0,
): void {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!container) return;

        const handleScroll = () => {
            let scrollContainer: HTMLElement | null = null;

            if (container === document) {
                scrollContainer = document.scrollingElement as HTMLElement | null;
            } else {
                scrollContainer = container as HTMLElement;
            }

            if (
                scrollContainer &&
                scrollContainer.scrollTop + scrollContainer.clientHeight >=
                    scrollContainer.scrollHeight - offset
            ) {
                callbackRef.current();
            }
        };

        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [container, offset]);
}
