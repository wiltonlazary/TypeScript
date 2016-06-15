//// [tests/cases/conformance/externalModules/moduleResolutionWithExtensions.ts] ////

//// [a.ts]

export default 0;

// No extension: '.ts' added
//// [b.ts]
import a from './a';

// Matching extension
//// [c.ts]
import a from './a.ts';

// '.js' extension: stripped and replaced with '.ts'
//// [d.ts]
import a from './a.js';

//// [jquery.d.ts]
declare var x: number;
export default x;

// No extension: '.d.ts' added
//// [jquery_user_1.ts]
import j from "./jquery";

// '.js' extension: stripped and replaced with '.d.ts'
//// [jquery_user_1.ts]
import j from "./jquery.js"


//// [a.js]
"use strict";
exports.__esModule = true;
exports["default"] = 0;
// No extension: '.ts' added 
//// [b.js]
"use strict";
// Matching extension 
//// [c.js]
"use strict";
// '.js' extension: stripped and replaced with '.ts' 
//// [d.js]
"use strict";
//// [jquery_user_1.js]
"use strict";
