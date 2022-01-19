export const PRODUCENT_ADD = 'PRODUCENT_ADD';
export const PRODUCENT_DELETE = 'PRODUCENT_DELETE';
export const PRODUCENT_EDIT = 'PRODUCENT_EDIT';
export const PRODUCENT_COMPLETE = 'PRODUCENT_COMPLETE';
export const PRODUCENTS_UPDATE = 'PRODUCENT_UPDATE';

export const addProducentAction = (payload) => ({
    type: PRODUCENT_ADD,
    payload
});

export const deleteProducentAction = (payload) => ({
    type: PRODUCENT_DELETE,
    payload
})

export const editProducentAction = (payload) => ({
    type: PRODUCENT_EDIT,
    payload
})

export const completeProducentAction = (payload) => ({
    type: PRODUCENT_COMPLETE,
    payload
})

export const updateProducentsAction = (payload) => ({
    type: PRODUCENTS_UPDATE,
    payload
})
