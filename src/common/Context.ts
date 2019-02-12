
import { find } from 'lodash-es';
import { Components } from '@vuex-orm/core/lib/plugins/use';
import * as LokiJs from 'lokijs';
import Database from '@vuex-orm/core/lib/database/Database';

/**
 * Provides a singleton context of vuex orm with lokijs.
 */
export default class Context {

  /**
   * Contains the instance for the singleton pattern.
   * @type {Context}
   */
  public static instance: Context;

  /**
   * Components collection of Vuex-ORM
   * @type {Components}
   */
  public readonly components: Components;

  /**
   * The options which have been passed to VuexOrm.install
   * @type {Options}
   */
  public readonly options: Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>;

  /**
   * The Vuex-ORM database
   * @type {Database}
   */
  public readonly database: Database;

  /**
   * The Loki Object
   * @type {Loki}
   */
  public readonly loki: Loki;

  /**
   * Private constructor, called by the setup method.
   *
   * @constructor
   * @param {Components} components The Vuex-ORM Components collection.
   * @param {Database} database The database passed to VuexORM.install.
   * @param {LokiConstructorOptions} lokiOptions The options passed to new LokiJS instance.
   */
  private constructor (components: Components, database: Database, options: Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>) {


    this.options = options;
    this.components = components;
    this.database = database;
    this.loki = new LokiJs('vuex-orm-loki', {
      env: options.env || 'BROWSER',
      verbose: options.verbose || false,
      autoload: options.autoload || true,
      autoloadCallback: this.autoLoadCallback.bind(this),
      autosave: options.autosave || true,
      autosaveCallback: options.autosaveCallback,
      autosaveInterval: options.autosaveInterval || 1000,
      persistenceMethod: options.persistenceMethod || 'localStorage',
      destructureDelimiter: options.destructureDelimiter || ',',
      serializationMethod: options.serializationMethod || 'normal',
      throttledSaves: options.throttledSaves || false,
    });
    this.loki.loadDatabase();
  };

  /**
   * ensures the loki db and vuex-orm state are in sync on load.
   * @param vuexOrmDb
   */
  public autoLoadCallback(err: any) : void {
    Object.keys(this.database.models()).forEach((key) => {
      if(this.loki.getCollection(this.database.models()[key].name) === null) {
        this.loki.addCollection(this.database.models()[key].name);
      };
    });

    Object.keys(this.database.models()).forEach((key) => {
      const lokiData = this.loki.getCollection(this.database.models()[key].name).data;
      const model = this.database.models()[key];

      lokiData.forEach((item) => {
        model.insert({data: item});
      });
    });

    if (this.options.hydrationCompletedCallback) {
      this.options.hydrationCompletedCallback();
    }

    // @todo remove the line below, for development purposes only
    window.loki = this.loki;
  };

  /**
   * This is called only once and creates a new instance of the Context.
   * @param {Components} components The Vuex-ORM Components collection.
   * @param {Database} database The database passed to VuexORM.install.
   * @param {Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>} options The options passed to new LokiJS instance.
   */
  public static setup (components: Components, database: Database, options: Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>) : Context {
    this.instance = new Context(components, database, options);
    return this.instance;
  }

  /**
   * Get the singleton instance of the context.
   * @returns {Context}
   */
  static getInstance() : Context {
    return this.instance
  }
}
