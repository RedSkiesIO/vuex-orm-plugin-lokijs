const $find = function (context) {
    return async function (payload) {
        const collectionName = this.name;
        const collection = context.loki.getCollection(collectionName);
   		const data = {};
        data[this.localKey()] = payload;
        return collection.find(data);
    };
};
export default $find;
