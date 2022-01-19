import { CARD_ADD, CARD_DELETE, CARD_EDIT, CARDS_UPDATE, CARD_COMPLETE } from "./CardActions";

export const cardReducer = (state = [], action) => {
    console.log(action);
    switch (action.type) {
        case CARD_ADD:
            return [...state, action.payload];
        case CARD_DELETE:
            return [...state.filter(el => el._id != action.payload._id)];
        case CARD_EDIT:
            return [...state.filter(el => el._id != action.payload._id), action.payload];
        case CARD_COMPLETE:
            return [...state.filter(el => el._id != action.payload._id), action.payload];
        case CARDS_UPDATE:
            return [...action.payload];
        default:
            return state;
    }
}