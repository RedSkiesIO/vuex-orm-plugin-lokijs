import Context from '../common/Context';
import Action from './Action';
// import Loki from '../orm/Loki';
// import { ActionParams, Data } from '../support/interfaces';
// import NameGenerator from '../graphql/name-generator';

/**
 * Fetch action for sending a query. Will be used for Model.fetch().
 */
export default class Fetch extends Action {

  /**
   * 
   * @param param0
   */  
  public static async call ({ state, dispatch } : any) {
    const context = Context.getInstance();
    // const model = this.getModelFromState(state);

    // Send the request to the GraphQL API
    // const data = await context.apollo.request(model, query, filter, false, bypassCache as boolean);

    // Insert incoming data into the store
    // return Store.insertData(data, dispatch);
  }
}