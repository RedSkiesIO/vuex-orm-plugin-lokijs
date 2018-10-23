export default class Axios {
    constructor(http: any);
    /**
     * Head Request
     * @param {string} url
     * @param {object} config
     */
    head(url: any, config?: {}): Promise<any>;
    /**
     * GET Request
     * @param {string} url
     * @param {object} config
     */
    get(url: any, config?: {}): Promise<any>;
    /**
     * POST Request
     * @param {string} url
     * @param {object} config
     */
    post(url: any, data?: {}, config?: {}): Promise<any>;
    /**
     * PATCH Request
     * @param {string} url
     * @param {object} config
     */
    patch(url: any, data?: {}, config?: {}): Promise<any>;
    /**
     * PUT Request
     * @param {string} url
     * @param {object} config
     */
    put(url: any, data?: {}, config?: {}): Promise<any>;
    /**
     * DELETE Request
     * @param {string} url
     * @param {object} config
     */
    delete(url: any, config?: {}): Promise<any>;
}
