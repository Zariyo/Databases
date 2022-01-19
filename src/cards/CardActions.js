export const CARD_ADD = 'CARD_ADD';
export const CARD_DELETE = 'CARD_DELETE';
export const CARD_EDIT = 'CARD_EDIT';
export const CARD_COMPLETE = 'CARD_COMPLETE';
export const CARDS_UPDATE = 'CARD_UPDATE';

export const addCardAction = (payload) => ({
    type: CARD_ADD,
    payload
});

export const deleteCardAction = (payload) => ({
    type: CARD_DELETE,
    payload
})

export const editCardAction = (payload) => ({
    type: CARD_EDIT,
    payload
})

export const completeCardAction = (payload) => ({
    type: CARD_COMPLETE,
    payload
})

export const updateCardsAction = (payload) => ({
    type: CARDS_UPDATE,
    payload
})
