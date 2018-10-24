import { Components } from '@vuex-orm/core/lib/plugins/use';
import Database from '@vuex-orm/core/lib/database/Database';
import RootState from '@vuex-orm/core/lib/modules/contracts/RootState';
import Context from './Context';
export declare type DispatchFunction = (action: string, data: Data) => Promise<any>;
/**
 * Defines contxt singleton interface.
 */
export interface ContextInterface {
    instance: Context;
    components: Components;
    options: Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>;
    database: Database;
    loki: Loki;
}
/**
 * defines options passed to new plugin-lokijs.
 */
export interface VuexORMLokiOptions {
    database: Database;
    options: Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>;
}
/**
 * defines payload sent to a model dispatch method.
 */
export interface dispatchPayload {
    data: Object;
}
/**
 * defines action parameters object.
 */
export interface ActionParams {
    commit: any;
    dispatch: DispatchFunction;
    getters: any;
    rootGetters: any;
    rootState: any;
    state: RootState;
    filter?: Filter;
    id?: number;
    data?: Data;
    args?: Arguments;
    variables?: Arguments;
    query?: string;
    multiple?: boolean;
    name?: string;
}
/**
 * data objet definition
 */
export interface Data {
    [index: string]: any;
}
export interface Filter {
    [index: string]: any;
}
export interface Arguments {
    [index: string]: any;
}
