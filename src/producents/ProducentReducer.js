import { PRODUCENT_ADD, PRODUCENT_DELETE, PRODUCENT_EDIT, PRODUCENTS_UPDATE, PRODUCENT_COMPLETE } from "./ProducentActions";

export const producentReducer = (state = [], action) => {
    console.log(action);
    switch (action.type) {
        case PRODUCENT_ADD:
            return [...state, action.payload];
        case PRODUCENT_DELETE:
            return [...state.filter(el => el._id != action.payload._id)];
        case PRODUCENT_EDIT:
            return [...state.filter(el => el._id != action.payload._id), action.payload];
        case PRODUCENT_COMPLETE:
            return [...state.filter(el => el._id != action.payload._id), action.payload];
        case PRODUCENTS_UPDATE:
            return [...action.payload];
        default:
            return state;
    }
}