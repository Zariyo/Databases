export const CARD_DOWNLOADED_CHANGE = 'DOWNLOADED_CHANGE';
export const PRODUCENT_DOWNLOADED_CHANGE = 'PRODUCENT_DOWNLOADED_CHANGE';

export const cardDownloadedChangeAction = (payload) => ({
    type: CARD_DOWNLOADED_CHANGE,
    payload
});

export const producentDownloadedChangeAction = (payload) => ({
    type: PRODUCENT_DOWNLOADED_CHANGE,
    payload
});