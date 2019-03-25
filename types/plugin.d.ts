import { Components, Plugin } from '@vuex-orm/core/lib/plugins/use';
import { VuexORMLokiOptions } from './common/Interfaces';
export default class VuexORMLokiPlugin implements Plugin {
    static instance: VuexORMLokiPlugin;
    static install(components: Components, options: VuexORMLokiOptions, hydrationCompletedCallback: any): VuexORMLokiPlugin;
}
