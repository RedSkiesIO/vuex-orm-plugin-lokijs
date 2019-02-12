const $delete = function (context) {
    return async function (payload) {
        const collectionName = this.name;
        const collection = context.loki.getCollection(collectionName);
        const data = {};
        data[this.localKey()] = payload;
        collection.findAndRemove(data);
        const result = await this.delete(payload);
        context.loki.saveDatabase();
    };
};
export default $delete;
