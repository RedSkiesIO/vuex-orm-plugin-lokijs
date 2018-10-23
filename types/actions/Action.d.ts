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
    protected static mutation(): Promise<any>;
}
