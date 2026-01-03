import ReactGA from "react-ga4";

export const trackEvent = (
    category: string,
    action: string,
    label?: string
): void => {
    ReactGA.event({
        category,
        action,
        label,
    });
};