const $findOne = function (context) {
    return async function (payload) {
        const collectionName = this.name;
        const collection = context.loki.getCollection(collectionName);
        const data = {};
        data[this.localKey()] = payload;
        return collection.findOne(data);
    };
};
export default $findOne;
