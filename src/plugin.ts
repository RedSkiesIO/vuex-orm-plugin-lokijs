import VuexORMLoki from './vuex-orm-loki';
import { Components, Plugin } from '@vuex-orm/core/lib/plugins/use';
import Database from '@vuex-orm/core/lib/database/Database';
import { VuexORMLokiOptions } from './common/Interfaces';

/**
 * Plugin class. This just provides a static install method for Vuex-ORM and stores the instance of the model
 * within this.instance.
 */
export default class VuexORMLokiPlugin implements Plugin {
  /**
   * Contains the instance of VuexORMLokiJSPlugin
   */
  public static instance: VuexORMLokiPlugin;

  /**
   * This is called, when VuexORM.install(VuexORMLokiPlugin, options) is called.
   *
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   * @returns {VuexORMLokiPlugin}
   */
  public static install (components: Components, options: VuexORMLokiOptions) : VuexORMLokiPlugin {
    VuexORMLokiPlugin.instance = new VuexORMLoki(components, options.database, options.options);
    // console.log('trace start');
    // console.log(VuexORMLokiPlugin.instance);
    return VuexORMLokiPlugin.instance;
  }
}
