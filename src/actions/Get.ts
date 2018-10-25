import Action from './Action';
import Context from '../common/Context';
import { dispatchGetPayload, insertDocCollection } from 'src/common/Interfaces';
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
  public static async call (state: State, payload: dispatchGetPayload) {
    console.log('<!---------trace start ------------------>');
    console.log(state);
    console.log(payload);
    console.log('<!---------trace end ------------------>');
  }
}
