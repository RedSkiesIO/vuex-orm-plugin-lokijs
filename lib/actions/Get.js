import Action from './Action';
/**
 * Insert action for sending a query. Will be used for Model.fetch().
 */
export default class Get extends Action {
    /**
     * call loki insert
     * @param state
     * @param dispatch
     */
    static async call(state, payload) {
        console.log('<!---------trace start ------------------>');
        console.log(state);
        console.log(payload);
        console.log('<!---------trace end ------------------>');
    }
}
