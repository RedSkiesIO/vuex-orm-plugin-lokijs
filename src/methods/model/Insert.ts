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

const $insert: any = function (context: any) {
  return async function (this: any, payload: any) {
    const collectionName = this.name
    const { password } = payload

    const result = await this.insert(payload)
    const collection = context.loki.getCollection(collectionName)
    result[this.entity].forEach((item: any) => {
      const jsonData = item.$toJson()

      if (this.AES) {
        this.AES.forEach((key: any) => {
          if (jsonData[key]) {
            if (!password) {
              throw new Error(`Cannot insert data. The ${collectionName} model contains encrypted fields ( ${this.AES}).
                               The object passed to $insert() method has to have a password property set.`)
            }

            jsonData[key] = encrypt(jsonData[key], password)
          }
        })
      }

      collection.insert(jsonData)
    })
    context.loki.saveDatabase()
    return result
  }
}
export default $insert
