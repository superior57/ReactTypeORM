/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:26:06
 * @modify date 2020-05-17 18:26:06
 * @desc [description]
 */
import crypto from "crypto";
import config from "../config/config";
const encryptionType = "aes-256-cbc";
const encryptionEncoding = "base64";
const bufferEncryption = "utf-8";

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;

const publicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAgGUG5LPS0Dm7kCCl+NmQ
/B2JvQCw65uF7sqUfJAKkU49kcseKOR0mopVtI6Qg/2ybpVYlvyDLSLfJaIBEVHU
d7TiWSJIWvRck0W1EPMCWzbJVe7/Ko0gPN9IZ9tiNqgdG/1dqkWygJDFPP8GtIda
qrsl4vbWE3AXVfvX9M/L4nva7lA5Ao9frTb9CCXvcAz+6C9/OTYT2Rzi6j7008wb
mMTeBwy3cbyfW6ewUeYqq8704wsqNh/c7Xun6XB34TtGDv9tCzhdxB4lk4W0Uacs
7U5pMob86Aewg6OhcYrm0YECcmaAkeh1Av7+PQPUMpgZDaEKuKiIxVUr6vx55zeI
cLqET1dP6I5q70xqGMVO29Diwrwa7PG2qL0om2etGVbfRPOIGPBLFDRt0yn7HTUl
zzXnniR00k3LDhcDJE5tAC/WwV5/mT178atgDK2jk9nNHo0E5e7cEYtM15CUk+dl
7FrSXTwT/nr5TtM+hzrK/lFUcR0kLvZ+9vJzKSCbUTCSkK1YMXR5yNTp7KwTi8Rf
LvLuEPy+AUV7tx+i3tVJG5HbMUSPX+UDkvmHfgnPbmlNR60ztMJNLy8ho6WgKKFF
eFRpKPh/onuAf3CZFUuj2r8vgT6xDWn3Mykhq1gWkXPWzmni0Uk+8JqHVOhe+Kcb
xP2VJm1vINPIPM9HfEz7XPcCAwEAAQ==
-----END PUBLIC KEY-----`;

class Encriptar {
  static encriptarRSA = (
    toEncrypt: string,
    _relativeOrAbsolutePathToPublicKey: string
  ) => {
    // var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    // var publicKey = fs.readFileSync(absolutePath, "utf8");
    try {
      var buffer = Buffer.from(toEncrypt);
      var encrypted = crypto.publicEncrypt(publicKey, buffer);
      const res = encrypted.toString("base64");
      return JSON.parse(res);
    } catch (error) {
      return { error };
    }
  };

  static decryptRSA = (
    toDecrypt: string,
    _relativeOrAbsolutePathtoPrivateKey: string
  ) => {
    // var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    // var privateKey = fs.readFileSync(absolutePath, "utf8");
    try {
      var buffer = Buffer.from(toDecrypt, "base64");
      var decrypted = crypto.privateDecrypt(privateKey, buffer);
      const res = decrypted.toString("utf8");
      return JSON.parse(res);
    } catch (error) {
      return { error };
    }
  };

  AesKey: string;
  AesIV: string;
  init() {
    this.AesKey = config.codePass;
    this.AesIV = "1234567890123456";
  }

  encrypt(jsonObject: Object): string {
    try {
      console.log("encript", this.AesKey, this.AesIV);
      const value = JSON.stringify(jsonObject);
      const val = Buffer.from(value, bufferEncryption);
      const key = Buffer.from(this.AesKey, bufferEncryption);
      const iv = Buffer.from(this.AesIV, bufferEncryption);
      console.log("11 ", value, key, val, iv);
      const cipher = crypto.createCipheriv(encryptionType, key, this.AesIV);
      
      let encrypted = cipher.update(val, bufferEncryption, encryptionEncoding);
      encrypted += cipher.final(encryptionEncoding);
      return encrypted;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  // decrypt(base64String: string): any {
  //   const buff = Buffer.from(base64String, encryptionEncoding);
  //   const key = Buffer.from(this.AesKey, bufferEncryption);
  //   const iv = Buffer.from(this.AesIV, bufferEncryption);
  //   const decipher = crypto.createDecipheriv(encryptionType, key, iv);
  //   const deciphered = decipher.update(buff) + decipher.final();
  //   return JSON.parse(deciphered);
  // }
}

export default Encriptar;
