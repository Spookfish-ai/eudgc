var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  EuDgc: () => EuDgc,
  EuDgc_parse: () => EuDgc_parse
});

// src/eudgc.ts
var import_cbor = require("cbor");
var import_base45 = __toESM(require("base45"));
var import_zlib = __toESM(require("zlib"));
var ClaimKeyHcert = -260;
var ClaimKeyEuDgcV1 = 1;
var EuDgc = class {
  static async parse(encodedData) {
    return new Promise((resolve, reject) => {
      if (encodedData.indexOf("HC1:") == 0) {
        encodedData = encodedData.substring(4);
      }
      const decodedData = import_base45.default.decode(encodedData);
      import_zlib.default.inflate(decodedData, function(error, buf) {
        try {
          (0, import_cbor.decodeFirst)(buf, function(error2, obj) {
            if (error2) {
              reject(error2);
              return;
            }
            const t = obj;
            const cwt = t.toJSON().value[2];
            (0, import_cbor.decodeFirst)(cwt, function(error3, obj2) {
              if (error3) {
                reject(error3);
                return;
              }
              const t2 = obj2;
              const hcertRaw = t2.get(ClaimKeyHcert);
              const eudgc = hcertRaw.get(ClaimKeyEuDgcV1);
              resolve(eudgc);
            });
          });
        } catch (error2) {
          reject(error2);
        }
      });
    });
  }
};
var EuDgc_parse = EuDgc.parse;
if (typeof window !== "undefined") {
  window.EuDgc_parse = EuDgc.parse;
}
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EuDgc,
  EuDgc_parse
});
