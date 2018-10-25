import Action from './Action';
import { dispatchGetPayload } from 'src/common/Interfaces';
import State from '@vuex-orm/core/lib/modules/contracts/State';
/**
 * Insert action for sending a query. Will be used for Model.fetch().
 */
export default class Get extends Action {
    /**
     * call loki insert
     * @param state
     * @param dispatch
     */
    static call(state: State, payload: dispatchGetPayload): Promise<void>;
}
