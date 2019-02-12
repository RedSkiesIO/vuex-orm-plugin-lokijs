const $insert = function (context) {
	return async function (payload) {
	    const result = await this.insert(payload);
	    const collectionName = this.name;

	    const collection = context.loki.getCollection(collectionName);

	    result[this.entity].forEach((item) => {
	        collection.insert(item.$toJson());
	    });

	    context.loki.saveDatabase();
	    return result;
	};
}

export default $insert;
