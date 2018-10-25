import { Components } from '@vuex-orm/core/lib/plugins/use';
import Context from './common/Context';
import Action from './actions/Action'
import Insert from './actions/Insert'
import Get from './actions/Get'
// import Create from './actions/Create'
// import Update from './actions/Update'
// import Delete from './actions/Delete'
// import { map } from 'lodash-es';
import Database from '@vuex-orm/core/lib/database/Database';
import { dispatchInsertPayload } from './common/Interfaces';

/**
 * Main class of the plugin. Setups the internal context, Vuex actions and model methods
 */
export default class VuexORMLoki {
  /**
   * @constructor
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   */
  public constructor(components: Components, database: Database, options: Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>) {
    Context.setup(components, database, options);
    VuexORMLoki.setupActionsMethods();
    VuexORMLoki.setupModelMethods();
  }

  /**
   * Allow everything to read the context.
   */
  public getContext(): Context {
    return Context.getInstance();
  }

  /**
   * This method will setup following Vuex actions: $fetch, $get, $create, $update, $delete
   */
  private static setupActionsMethods() {
    const context = Context.getInstance();

    context.components.Actions.$insert = Insert.call.bind(Insert);
    context.components.Actions.$get = Get.call.bind(Get);
    // context.components.Actions.$create = Create.call.bind(Create);
    // context.components.Actions.$update = Update.call.bind(Update);
    // context.components.Actions.$delete = Delete.call.bind(Delete);
  }

  private static setupModelMethods() {
    const context = Context.getInstance();

    const model = context.components.Model.prototype;

    model.$insert = function (payload: dispatchInsertPayload) {
      return this.$dispatch('insert', payload);
    };
  }
}
