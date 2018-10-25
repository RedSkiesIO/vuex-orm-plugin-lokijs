import Action from './Action';
import Context from '../common/Context';
import { dispatchInsertPayload, insertDocCollection } from 'src/common/Interfaces';
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
  public static async call (state: State, payload: dispatchInsertPayload) : Promise<Object> {
    return new Promise((resolve) : void => {
      const context = Context.getInstance();
      state.dispatch('insert', payload).then((docs : insertDocCollection) => {
        Object.keys(docs).forEach((key : string) => {
          docs[key].forEach((doc : Object) => {
            const collection = context.loki.getCollection(key);
            collection.insert(doc);
            context.loki.saveDatabase();
            resolve();
          });
        });
      });
    })
  }
}
