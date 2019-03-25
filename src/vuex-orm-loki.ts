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
import Context from './common/Context'
import modelMethods from './methods/model'
import Database from '@vuex-orm/core/lib/database/Database'
import { dispatchInsertPayload } from './common/Interfaces'

/**
 * Main class of the plugin. Setups the internal context, Vuex actions and model methods
 */
export default class VuexORMLoki {
  /**
   * @constructor
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   */
  public constructor (components: Components, database: Database, options: Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>, hydrationCompletedCallback: any) {
    Context.setup(components, database, options, hydrationCompletedCallback)
    VuexORMLoki.setupModelMethods()
  }

  /**
   * Allow everything to read the context.
   */
  public getContext (): Context {
    return Context.getInstance()
  }

  private static setupModelMethods () {
    const context: Context = Context.getInstance()
    const model: any = context.components.Model

    const {
      $insert,
      $update,
      $delete,
      $find,
      $all
    } = modelMethods

    model.$insert = $insert(context)
    model.$update = $update(context)
    model.$delete = $delete(context)
    model.$find = $find(context)
    model.$all = $all(context)
  }
}
