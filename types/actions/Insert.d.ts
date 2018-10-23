import Action from './Action';
/**
 * Insert action for sending a query. Will be used for Model.fetch().
 */
export default class Insert extends Action {
    /**
     * call loki insert
     * @param state
     * @param dispatch
     */
    static call(state: any, dispatch: any): Promise<void>;
}
