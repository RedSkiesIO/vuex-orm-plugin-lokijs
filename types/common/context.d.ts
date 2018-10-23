import { Components } from '@vuex-orm/core/lib/plugins/use';
import Database from '@vuex-orm/core/lib/database/Database';
/**
 * Provides a singleton context of vuex orm with lokijs.
 */
export default class Context {
    /**
     * Contains the instance for the singleton pattern.
     * @type {Context}
     */
    static instance: Context;
    /**
     * Components collection of Vuex-ORM
     * @type {Components}
     */
    readonly components: Components;
    /**
     * The options which have been passed to VuexOrm.install
     * @type {Options}
     */
    readonly options: Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>;
    /**
     * The Vuex-ORM database
     * @type {Database}
     */
    readonly database: Database;
    /**
     * The Loki Object
     * @type {Loki}
     */
    readonly loki: Loki;
    /**
     * Private constructor, called by the setup method.
     *
     * @constructor
     * @param {Components} components The Vuex-ORM Components collection.
     * @param {Database} database The database passed to VuexORM.install.
     * @param {LokiConstructorOptions} lokiOptions The options passed to new LokiJS instance.
     */
    private constructor();
    /**
     * This is called only once and creates a new instance of the Context.
     * @param {Components} components The Vuex-ORM Components collection.
     * @param {Database} database The database passed to VuexORM.install.
     * @param {LokiConstructorOptions} lokiOptions The options passed to new LokiJS instance.
     */
    static setup(components: Components, database: Database, options: Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>): Context;
    /**
     * Get the singleton instance of the context.
     * @returns {Context}
     */
    static getInstance(): Context;
}
