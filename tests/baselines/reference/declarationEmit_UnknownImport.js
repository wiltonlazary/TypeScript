//// [declarationEmit_UnknownImport.ts]

import Foo = SomeNonExistingName
export {Foo}

//// [declarationEmit_UnknownImport.js]
"use strict";
var Foo = SomeNonExistingName;
exports.Foo = Foo;
