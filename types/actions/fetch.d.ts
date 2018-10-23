import Action from './Action';
/**
 * Fetch action for sending a query. Will be used for Model.fetch().
 */
export default class Fetch extends Action {
    /**
     *
     * @param param0
     */
    static call({ state, dispatch }: any): Promise<void>;
}
