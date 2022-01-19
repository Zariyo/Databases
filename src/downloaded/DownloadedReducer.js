import { CARD_DOWNLOADED_CHANGE } from "./DownloadedActions";
import { PRODUCENT_DOWNLOADED_CHANGE } from "./DownloadedActions";

export const downloadedReducer = (state = [false, false], action) => {
    console.log(action);
    switch (action.type) {
        case CARD_DOWNLOADED_CHANGE:
            return [!state[0], state[1]];
        case PRODUCENT_DOWNLOADED_CHANGE:
            return [state[0], !state[1]];
        default:
            return state;
    }
}
