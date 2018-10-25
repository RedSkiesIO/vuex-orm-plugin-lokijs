import Action from './Action';
import { dispatchInsertPayload } from 'src/common/Interfaces';
import State from '@vuex-orm/core/lib/modules/contracts/State';
/**
 * Insert action for sending a query. Will be used for Model.fetch().
 */
export default class Insert extends Action {
    /**
     * call loki insert
     * @param state
     * @param dispatch
     */
    static call(state: State, payload: dispatchInsertPayload): Promise<Object>;
}
