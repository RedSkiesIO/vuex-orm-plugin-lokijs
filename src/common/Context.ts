// Copyright (C) Atlas City Global <https://atlascity.io>
// This file is part of vuex-orm-plugin-lokijs <https://github.com/atlascity/vuex-orm-plugin-lokijs>.
//
// vuex-orm-plugin-lokijs is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// vuex-orm-plugin-lokijs is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with vuex-orm-plugin-lokijs.  If not, see <http://www.gnu.org/licenses/>.

import { Components } from '@vuex-orm/core/lib/plugins/use'
import LokiJs from 'lokijs'
import Database from '@vuex-orm/core/lib/database/Database'

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
   * Called on hydration completed
   * @type {any}
   */
  public readonly hydrationCompletedCallback: any;

  /**
   * The Loki Object
   * @type {Loki}
   */
  public readonly loki: LokiJs;

  /**
   * Private constructor, called by the setup method.
   *
   * @constructor
   * @param {Components} components The Vuex-ORM Components collection.
   * @param {Database} database The database passed to VuexORM.install.
   * @param {LokiConstructorOptions} lokiOptions The options passed to new LokiJS instance.
   */
  private constructor (components: Components, database: Database, options: Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>, hydrationCompletedCallback: any) {
    this.options = options
    this.components = components
    this.database = database
    this.hydrationCompletedCallback = hydrationCompletedCallback

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
      adapter: options.adapter || null
    })

    this.loki.loadDatabase()
  };

  /**
   * ensures the loki db and vuex-orm state are in sync on load.
   * @param vuexOrmDb
   */
  public autoLoadCallback () : void {
    Object.keys(this.database.models()).forEach((key) => {
      if (this.loki.getCollection(this.database.models()[key].name) === null) {
        this.loki.addCollection(this.database.models()[key].name)
      };
    })

    Object.keys(this.database.models()).forEach((key) => {
      const lokiData = this.loki.getCollection(this.database.models()[key].name).data
      const model = this.database.models()[key]

      lokiData.forEach((item) => {
        model.insert({ data: item })
      })
    })

    if (this.hydrationCompletedCallback) {
      this.hydrationCompletedCallback()
    }
  };

  /**
   * This is called only once and creates a new instance of the Context.
   * @param {Components} components The Vuex-ORM Components collection.
   * @param {Database} database The database passed to VuexORM.install.
   * @param {Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>} options The options passed to new LokiJS instance.
   */
  public static setup (components: Components, database: Database, options: Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>, hydrationCompletedCallback: any) : Context {
    this.instance = new Context(components, database, options, hydrationCompletedCallback)
    return this.instance
  }

  /**
   * Get the singleton instance of the context.
   * @returns {Context}
   */
  static getInstance () : Context {
    return this.instance
  }
}
