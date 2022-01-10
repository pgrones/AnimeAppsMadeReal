import { useRef, useEffect } from "react";

export const useAnimationFrame = (duration: number, delay: number, callback: (deltaTime: number) => void) => {
    // Request ID of requestAnimationFrame()
    const requestRef = useRef<number>();
    // Start Time of the animation
    const startTimeRef = useRef<number>();
    // Time of the previous animationframe
    const previousTimeRef = useRef<number>(0);

    // animate() is called recursively until the duration is over
    const animate = (time: number) => {
        // Set the start time...
        if (startTimeRef.current === undefined) {
            startTimeRef.current = time;
        }

        // ...to calculate the elapsed time
        const elapsed = time - startTimeRef.current;

        // Do the animation if we have a new frame
        if (previousTimeRef.current !== time) {
            callback(elapsed);
        }

        // Only recurse if we still haven't reached the duration of the animation
        if (elapsed < duration) {
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        }
    }

    // Start the animation
    useEffect(() => {
        // Add a delay if necessary
        const timeout = setTimeout(() => requestRef.current = requestAnimationFrame(animate), delay);
        // Cleanup
        return () => {
            clearTimeout(timeout);
            requestRef.current && cancelAnimationFrame(requestRef.current)
        };
    }, []);
}