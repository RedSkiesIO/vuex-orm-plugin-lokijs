import Context from '../common/Context';
export default class Action {
    /**
     * Sends a mutation.
     *
     * @param {string} name Name of the mutation like 'createUser'
     * @param {Data | undefined} variables Variables to send with the mutation
     * @param {Function} dispatch Vuex Dispatch method for the model
     * @param {Model} model The model this mutation affects.
     * @param {boolean} multiple Tells if we're requesting a single record or multiple.
     * @returns {Promise<any>}
     */
    static async mutation() {
        const context = Context.getInstance();
        // Send GraphQL Mutation
        // let newData = await Context.getInstance().apollo.request(model, query, variables, true);
        return true;
    }
}