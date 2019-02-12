const $update = function (context) {
	return async function (payload) {
		const collectionName = this.name;
	    const collection = context.loki.getCollection(collectionName);

		if (typeof payload.where === 'function') {
			collection.updateWhere(payload.where, (item) => {
				return Object.assign(item, payload.data);
			});
		} else {
			console.error(`data has not been put into loki, use vuexorm where() filter function when you do updates:

				User.update({
				  where: (record) => {
				    return record.id === 2
				  },

				  data: { age: 24 }
				})

			`);
		}

		const result = await this.update(payload);
		context.loki.saveDatabase();
	};
}

export default $update;
