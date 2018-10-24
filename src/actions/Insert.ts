import Action from './Action';
import Context from '../common/Context';

/**
 * Insert action for sending a query. Will be used for Model.fetch().
 */
export default class Insert extends Action {

  /**
   * call loki insert
   * @param state
   * @param dispatch
   */
  public static async call (state: any, dispatch: any) : Promise<Object> {
    return new Promise((resolve) : void => {
      const context = Context.getInstance();
      state.dispatch('insert', dispatch).then((docs : any) => {
        Object.keys(docs).forEach((key) => {
          docs[key].forEach((doc : any) => {
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
