import VuexORMLoki from './vuex-orm-loki';
/**
 * Plugin class. This just provides a static install method for Vuex-ORM and stores the instance of the model
 * within this.instance.
 */
export default class VuexORMLokiPlugin {
    /**
     * This is called, when VuexORM.install(VuexORMLokiPlugin, options) is called.
     *
     * @param {Components} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     * @returns {VuexORMLokiPlugin}
     */
    static install(components, options) {
        VuexORMLokiPlugin.instance = new VuexORMLoki(components, options.database, options.options);
        return VuexORMLokiPlugin.instance;
    }
}
