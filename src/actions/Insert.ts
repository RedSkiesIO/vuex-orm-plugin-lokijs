import Context from '../common/Context';
import Action from './Action';
// import Loki from '../orm/Loki';
// import { ActionParams, Data } from '../support/interfaces';
// import NameGenerator from '../graphql/name-generator';

/**
 * Insert action for sending a query. Will be used for Model.fetch().
 */
export default class Insert extends Action {

  /**
   * call loki insert
   * @param state
   * @param dispatch
   */
  public static async call (state: any, dispatch: any) {
    const context = Context.getInstance();
    console.trace();
    console.log('<!-------trace--------->');
    console.log(context);
    state.dispatch('insert', dispatch).then((x : any) => {
      console.log('im a promise callbck');
      console.log(Object.keys(x));
      console.log(dispatch.data[0]);
    });
    console.log('<!---------------->');
    // context.loki.insert({ lol: true });
    // const model = this.getModelFromState(state);

    // Send the request to the GraphQL API
    // const data = await context.apollo.request(model, query, filter, false, bypassCache as boolean);

    // Insert incoming data into the store
    // return Store.insertData(data, dispatch);
  }
}
