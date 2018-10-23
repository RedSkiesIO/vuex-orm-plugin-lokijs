# Installation

## Direct Download / CDN

https://unpkg.com/vuex-orm-lokijs/dist/vuex-orm-lokijs

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/vuex-orm-lokijs@0.0.1/dist/vuex-orm-lokijs.js
 
Include vuex-orm-lokijs after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vuex-orm-lokijs/dist/vuex-orm-lokijs.js"></script>
```

## NPM

```sh
$ npm install vuex-orm-lokijs
```

## Yarn

```sh
$ yarn add vuex-orm-lokijs
```

When used with a module system, you must explicitly install the `vuex-orm-lokijs` via `Vue.use()`:

```javascript
import Vue from 'vue'
import VuexOrmLokijs from 'vuex-orm-lokijs'

Vue.use(VuexOrmLokijs)
```

You don't need to do this when using global script tags.

## Dev Build

You will have to clone directly from GitHub and build `vuex-orm-lokijs` yourself if
you want to use the latest dev build.

```sh
$ git clone https://github.com/nsh-core/vuex-orm-lokijs.git node_modules/vuex-orm-lokijs
$ cd node_modules/vuex-orm-lokijs
$ npm install
$ npm run build
```

