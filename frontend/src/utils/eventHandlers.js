export const createEventHandler = (element, events) => {
    Object.entries(events).forEach(([event, handler]) => {
        element.addEventListener(event, handler);
    });
    
    return () => {
        Object.entries(events).forEach(([event, handler]) => {
            element.removeEventListener(event, handler);
        });
    };
}; 