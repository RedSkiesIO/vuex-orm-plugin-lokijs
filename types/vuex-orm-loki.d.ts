/// <reference types="lokijs" />
import { Components } from '@vuex-orm/core/lib/plugins/use';
import Context from './common/Context';
import Database from '@vuex-orm/core/lib/database/Database';
/**
 * Main class of the plugin. Setups the internal context, Vuex actions and model methods
 */
export default class VuexORMLoki {
    /**
     * @constructor
     * @param {Components} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     */
    constructor(components: Components, database: Database, options: Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>, hydrationCompletedCallback: any);
    /**
     * Allow everything to read the context.
     */
    getContext(): Context;
    private static setupModelMethods;
}
