//// [parserExportAssignment8.ts]
export = B;

export class C {
}

//// [parserExportAssignment8.js]
"use strict";
var C = (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
module.exports = B;
