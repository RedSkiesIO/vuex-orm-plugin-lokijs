import { Components } from '@vuex-orm/core/lib/plugins/use';
import { Options } from './support/interfaces';
import Context from './common/Context';
/**
 * Main class of the plugin. Setups the internal context, Vuex actions and model methods
 */
export default class VuexORMGLoki {
    /**
     * @constructor
     * @param {Components} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     */
    constructor(components: Components, options: Options);
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
