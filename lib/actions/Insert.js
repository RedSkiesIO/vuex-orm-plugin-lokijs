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
    static async call(state, payload) {
        return new Promise((resolve) => {
            const context = Context.getInstance();
            state.dispatch('insert', payload).then((docs) => {
                Object.keys(docs).forEach((key) => {
                    docs[key].forEach((doc) => {
                        const collection = context.loki.getCollection(key);
                        collection.insert(doc);
                        context.loki.saveDatabase();
                        resolve();
                    });
                });
            });
        });
    }
}
