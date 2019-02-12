import AES from 'crypto-js/aes';
import encUTF8 from 'crypto-js/enc-utf8';

/**
 * Encrypts and returns a piece of data
 * @param  {Any} data
 * @param  {String} password
 * @return {Uint8Array}
 */
function encrypt(data, password) {
  try {
    return AES.encrypt(JSON.stringify(data), password).toString();
  } catch (exception) {
    throw new Error(exception.message);
  }
}

const $insert = function (context) {
    return async function (payload) {
        const collectionName = this.name;
        const { password } = payload;

        if (this.AES && !password) {
            throw new Error(`Cannot insert data. The ${collectionName} model contains encrypted fields ( ${this.AES }).
                             The object passed to $insert() method has to have a password property set.`);
        }

        const result = await this.insert(payload);
        const collection = context.loki.getCollection(collectionName);
        result[this.entity].forEach((item) => {
            let jsonData = item.$toJson();

            if (this.AES) {
                this.AES.forEach((key) => {
                    jsonData[key] = encrypt(jsonData[key], password);
                });
            }

            collection.insert(jsonData);
        });
        context.loki.saveDatabase();
        return result;
    };
};
export default $insert;
