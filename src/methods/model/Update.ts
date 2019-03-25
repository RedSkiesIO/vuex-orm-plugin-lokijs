// Copyright (C) Atlas City Global <https://atlascity.io>
// This file is part of vuex-orm-plugin-lokijs <https://github.com/atlascity/vuex-orm-plugin-lokijs>.
//
// vuex-orm-plugin-lokijs is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// vuex-orm-plugin-lokijs is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with vuex-orm-plugin-lokijs.  If not, see <http://www.gnu.org/licenses/>.

import AES from 'crypto-js/aes'
import encUTF8 from 'crypto-js/enc-utf8'

function encrypt (data: any, password: any) {
  try {
    return AES.encrypt(JSON.stringify(data), password).toString()
  } catch (exception) {
    throw new Error(exception.message)
  }
}

const $update: any = function (context: any) {
  return async function (this: any, payload: any) {
    const collectionName = this.name
    const { password } = payload

    if (this.AES) {
      this.AES.forEach((key: any) => {
        if (payload.data[key] && !password) {
          throw new Error(`attempted to update an encrypted field "${key}" without providing password`)
        }
        if (payload.data[key]) {
          payload.data[key] = encrypt(payload.data[key], password)
        }
      })
    }

    const collection = context.loki.getCollection(collectionName)

    if (typeof payload.where === 'function') {
      collection.updateWhere(payload.where, (item: any) => {
        return Object.assign(item, payload.data)
      })
    } else {
      console.error(`data has not been put into loki, use vuexorm where() filter function when you do updates:

        User.update({
          where: (record) => {
            return record.id === 2
          },

          data: { age: 24 }
        })

      `)
    }

    const result = await this.update(payload)
    context.loki.saveDatabase()
  }
}

export default $update
