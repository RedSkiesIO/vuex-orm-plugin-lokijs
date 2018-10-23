export default class Loki {
    instance: LokiConstructor;
    constructor(options: Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>);
}
