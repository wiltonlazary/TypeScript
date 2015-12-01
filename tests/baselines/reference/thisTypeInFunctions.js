//// [thisTypeInFunctions.ts]
// body checking
class C {
    n: number;
    explicitThis(this: this, m: number): number {
        return this.n + m;
    }
    implicitThis(m: number): number {
        return this.n + m;
    }
    explicitC(this: C, m: number): number {
        return this.n + m;
    }
    explicitProperty(this: {n: number}, m: number): number {
        return this.n + m;
    }
    explicitVoid(this: void, m: number): number {
        return m + 1;
    }
}
class D extends C { }
class B {
    n: number;
}
function f(this: { y: number }, x: number): number {
    return x + this.y;
}
function noThisSpecified(x: number): number {
    // for backward compatibility, this: any, so this is ok
    // (until we add --noImplicitThisAny)
    return x + this.notSpecified;
}

// parameter checking
let ok: {y: number, f: (this: { y: number }, x: number) => number} = { y: 12, f };
let implicitAnyOk: {notSpecified: number, f: (x: number) => number} = { notSpecified: 12, f: noThisSpecified };
ok.f(13);
noThisSpecified(12);
implicitAnyOk.f(12);

let c = new C();
let d = new D();
let ripped = c.explicitC;
c.explicitC(12);
c.explicitProperty(12);
c.explicitThis(12);
c.implicitThis(12);
d.explicitC(12);
d.explicitProperty(12);
d.explicitThis(12);
d.implicitThis(12);
let reconstructed: { 
    explicitProperty: (this: {n : number}, m: number) => number,
    implicitThis: (m: number) => number,
    n: number,
} = { 
    explicitProperty: c.explicitProperty, 
    implicitThis: c.implicitThis,
    n: 12 
};
reconstructed.explicitProperty(11);
reconstructed.implicitThis(11);

// assignment checking
let specifiedToAny: (x: number) => number = f;
let specifiedToSpecified: (this: {y: number}, x: number) => number = f;
let anyToSpecified: (this: { y: number }, x: number) => number = function(x: number): number { return x + 12; };

let unspecifiedLambda: (x: number) => number = x => x + 12;
let specifiedLambda: (this: void, x: number) => number = x => x + 12;
let unspecifiedLambdaToSpecified: (this: {y: number}, x: number) => number = unspecifiedLambda;



let explicitCFunction: (this: C, m: number) => number;
let explicitPropertyFunction: (this: {n: number}, m: number) => number;
c.explicitC = explicitCFunction;
c.explicitC = function(this: C, m: number) { return this.n + m };
c.explicitProperty = explicitPropertyFunction;
c.explicitProperty = function(this: {n: number}, m: number) { return this.n + m };
c.explicitProperty = reconstructed.explicitProperty;

//NOTE: this=C here, I guess?
c.explicitThis = explicitCFunction;
c.explicitThis = function(this: C, m: number) { return this.n + m };

// this:any compatibility
c.explicitC = function(m: number) { return this.n + m };
c.explicitProperty = function(m: number) { return this.n + m };
c.explicitThis = function(m: number) { return this.n + m };
c.implicitThis = function(m: number) { return this.n + m };
c.implicitThis = reconstructed.implicitThis;

c.explicitC = function(this: B, m: number) { return this.n + m };

// this:void compatibility
c.explicitVoid = n => n;

//// [thisTypeInFunctions.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// body checking
var C = (function () {
    function C() {
    }
    C.prototype.explicitThis = function (this, m) {
        return this.n + m;
    };
    C.prototype.implicitThis = function (m) {
        return this.n + m;
    };
    C.prototype.explicitC = function (this, m) {
        return this.n + m;
    };
    C.prototype.explicitProperty = function (this, m) {
        return this.n + m;
    };
    C.prototype.explicitVoid = function (this, m) {
        return m + 1;
    };
    return C;
})();
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    return D;
})(C);
var B = (function () {
    function B() {
    }
    return B;
})();
function f(this, x) {
    return x + this.y;
}
function noThisSpecified(x) {
    // for backward compatibility, this: any, so this is ok
    // (until we add --noImplicitThisAny)
    return x + this.notSpecified;
}
// parameter checking
var ok = { y: 12, f: f };
var implicitAnyOk = { notSpecified: 12, f: noThisSpecified };
ok.f(13);
noThisSpecified(12);
implicitAnyOk.f(12);
var c = new C();
var d = new D();
var ripped = c.explicitC;
c.explicitC(12);
c.explicitProperty(12);
c.explicitThis(12);
c.implicitThis(12);
d.explicitC(12);
d.explicitProperty(12);
d.explicitThis(12);
d.implicitThis(12);
var reconstructed = {
    explicitProperty: c.explicitProperty,
    implicitThis: c.implicitThis,
    n: 12
};
reconstructed.explicitProperty(11);
reconstructed.implicitThis(11);
// assignment checking
var specifiedToAny = f;
var specifiedToSpecified = f;
var anyToSpecified = function (x) { return x + 12; };
var unspecifiedLambda = function (x) { return x + 12; };
var specifiedLambda = function (x) { return x + 12; };
var unspecifiedLambdaToSpecified = unspecifiedLambda;
var explicitCFunction;
var explicitPropertyFunction;
c.explicitC = explicitCFunction;
c.explicitC = function (this, m) { return this.n + m; };
c.explicitProperty = explicitPropertyFunction;
c.explicitProperty = function (this, m) { return this.n + m; };
c.explicitProperty = reconstructed.explicitProperty;
//NOTE: this=C here, I guess?
c.explicitThis = explicitCFunction;
c.explicitThis = function (this, m) { return this.n + m; };
// this:any compatibility
c.explicitC = function (m) { return this.n + m; };
c.explicitProperty = function (m) { return this.n + m; };
c.explicitThis = function (m) { return this.n + m; };
c.implicitThis = function (m) { return this.n + m; };
c.implicitThis = reconstructed.implicitThis;
c.explicitC = function (this, m) { return this.n + m; };
// this:void compatibility
c.explicitVoid = function (n) { return n; };
