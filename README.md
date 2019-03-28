# vuex-orm-plugin-loki


[![npm version](https://badge.fury.io/js/%40atlascity%2Fvuex-orm-plugin-lokijs.svg)](https://badge.fury.io/js/%40atlascity%2Fvuex-orm-plugin-lokijs)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

vuex-orm LokiJS persistance (Local Storage) plugin, with optional AES encryption.

## Installation

`npm install @atlascity/vuex-orm-plugin-lokijs`

## Why & How
	* We needed persistent, Local Storage based VuexORM database.
	* Each time you modify your VuexORM database, the same is going to be applied to the LokiJS database and saved into Local Storage. When you initialize your VuexORM database, the plugin will hydrate VuexORM with data stored in Local Storage (preserving original IDs).

## Caveats
Only some of VuexORM model methods are currently implemented. There is no support for VuexORM relationships, you have to manage that yourself. Feel free to fork!

## Examples

### $all


### $insert
	```js
	import MyModel from './models/MyModel';
	const data = { name: 'Bob' };
	MyModel.$insert({ data }); // insert data using $insert() instead of regular insert()

	// retrieve data using regular VuexORM query()
	const bob = MyModel.query().where('name', 'Bob').get();
	```
	### $update
	```js
	MyModel.$update({
	  where: record => record.name === 'Bob',
	  data: { name: 'Bobby' },
	});
	```

### $delete
	```js
	const bobby = MyModel.query().where('name', 'Bobby').get();
	MyModel.$delete(bobby.id);
	```

### $update
	```js
	import MyModel from './models/MyModel';

    MyModel.$update({
      where: (record) => { return record.id === id; },
      data: { example: 'data' },
    });
	```

## Usage
	```js
	import Vue from 'vue';
	import Vuex from 'vuex';
	import VuexORM from '@vuex-orm/core';
	import VuexORMLoki from 'vuex-orm-lokijs';
	import { Model } from '@vuex-orm/core';

	// define your VuexORM model
	class MyModel extends Model {
	  static entity = 'MyModel';
	  static fields() {
	    return {
	      id: this.increment(),
	      data: this.attr(''),
	    };
	  }
	}

	Vue.use(Vuex);
	const database = new VuexORM.Database();
	database.register(MyModel, {});

	const options = {
	  env: 'browser',
	};

	function hydrationCompletedCallback() {
	  // data from LocalStorage has been fully loaded into VuexORM
	}

	VuexORM.use(VuexORMLoki, { database, options, hydrationCompletedCallback });

	const store = new Vuex.Store({
	  plugins: [VuexORM.install(database)],
	});

	```

## Encryption
Encryption currently only works on `$insert()`.

### Setup the model
	```js
	import { Model } from '@vuex-orm/core';

	export default MyModel extends Model {
	  static entity = 'MyModel';
	  static AES = ['secretProperty1', 'secretProperty2']; // tell the plugin what to encrypt

	  static fields() {
	    return {
	      id: this.increment(),
	      name: this.attr(),
	      secretProperty1: this.attr(),
	      secretProperty2: this.attr(),
	    };
	  }
	}
	```
### Insert data with password
	```js
	import MyModel from './models/MyModel';
	const data = {
	  name: 'Bob',
	  secretProperty1: 'Very sensitive data',
	  secretProperty2: 'Even more',
	};

	const password = "your password";

	/*
	 * before being put into the database, the data
	 * will be encrypted with AES using the password
	 */
	MyModel.$insert({ data, password }); // pass the password
	```

### Update data with password
	```js
	import MyModel from './models/MyModel';
	const data = {
	  name: 'Bob',
	  secretProperty1: 'Very sensitive data',
	  secretProperty2: 'Even more',
	};

	const password = "your password";

	/*
	 * before being put into the database, the data
	 * will be encrypted with AES using the password
	 */
	MyModel.$update({ data, password }); // pass the password
	```

### Retrieve data and decrypt
	```js
	import AES from 'crypto-js/aes';
	import encUTF8 from 'crypto-js/enc-utf8';
	import MyModel from './models/MyModel';

	function decrypt(data, password) {
	  const bytes = AES.decrypt(data, password);
	  return JSON.parse(bytes.toString(encUTF8));
	}

	const bob = MyModel.query().where('name', 'Bob').get();

	MyModel.AES.forEach((key) => {
	  bob[key] = decrypt(bob[key], password);
	});
	```

## :scroll: Changelog
Details changes for each release are documented in the [CHANGELOG.md](https://github.com/atlascity/vuex-orm-plugin-loki/blob/develop/CHANGELOG.md).

## :exclamation: Issues
Please make sure to read the [Issue Reporting Checklist](https://github.com/atlascity/vuex-orm-plugin-loki/blob/develop/CONTRIBUTING.md#issue-reporting-guidelines) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## :muscle: Contribution
Please make sure to read the [Contributing Guide](https://github.com/atlascity/vuex-orm-plugin-loki/blob/develop/CONTRIBUTING.md) before making a pull request.

## Contributors
Here are the wonderfull soles who contribute to this project

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://hub.docker.com/u/jkirkby91"><img src="https://avatars2.githubusercontent.com/u/21375475?v=4" width="100px;" alt="nshCore"/><br /><sub><b>nshCore</b></sub></a><br /><a href="https://github.com/nshCore/community/commits?author=nshCore" title="Code">💻</a> <a href="#example-nshCore" title="Examples">💡</a> <a href="#ideas-nshCore" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-nshCore" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#plugin-nshCore" title="Plugin/utility libraries">🔌</a></td><td align="center"><a href="https://github.com/dufia"><img src="https://avatars1.githubusercontent.com/u/5569649?v=4" width="100px;" alt="Konrad Moskal"/><br /><sub><b>Konrad Moskal</b></sub></a><br /><a href="https://github.com/nshCore/community/commits?author=dufia" title="Code">💻</a> <a href="#ideas-dufia" title="Ideas, Planning, & Feedback">🤔</a> <a href="#review-dufia" title="Reviewed Pull Requests">👀</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

## :copyright: License

[GPL-2.0-only](https://opensource.org/licenses/gpl-2.0.php)