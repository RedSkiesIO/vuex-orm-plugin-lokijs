import { Components } from '@vuex-orm/core/lib/plugins/use';
import Context from './common/Context';
import Database from '@vuex-orm/core/lib/database/Database';
/**
 * defines payload sent to a model dispatch method.
 */
export interface dispatchPayload {
    data: Object;
}
/**
 * Main class of the plugin. Setups the internal context, Vuex actions and model methods
 */
export default class VuexORMLoki {
    /**
     * @constructor
     * @param {Components} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     */
    constructor(components: Components, database: Database, options: Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>);
    /**
     * Allow everything to read the context.
     */
    getContext(): Context;
    /**
     * This method will setup following Vuex actions: $fetch, $get, $create, $update, $delete
     */
    private static setupActionsMethods;
    private static setupModelMethods;
}
