//// [thisTypeInFunctionsNegative.ts]
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
		return this.n + m; // 'n' doesn't exist on type 'void'.
    }
}
class D {
	x: number;
	explicitThis(this: this, m: number): number {
		return this.x + m;
	}
	explicitD(this: D, m: number): number {
		return this.x + m;
	}
	implicitD(m: number): number {
		return this.x + m;
	}
}
interface I {
    a: number;
    explicitVoid1(this: void): number;
    explicitVoid2(this: void): number;
    explicitStructural(this: {a: number}): number;
    explicitInterface(this: I): number;
    // explicitThis(this: this): number; // TODO: Allow `this` types for interfaces
    implicitMethod(): number; // defaults to `this` :(
    implicitFunction: () => number;
}
let impl: I = {
    a: 12,
    explicitVoid1() {
        return this.a; // error, no 'a' in 'void'
    },
    explicitVoid2: () => this.a, // ok, `this:any` because it refers to an outer object
    explicitStructural: () => 12,
    explicitInterface: () => 12,
    implicitMethod() {
        return this.a; // ok, I.a: number
    },
    implicitFunction: function () { return this.a; } // TODO: error 'a' not found in 'void'
}
let implExplicitStructural = impl.explicitStructural;
implExplicitStructural(); // error, no 'a' in 'void'
let implExplicitInterface = impl.explicitInterface;
implExplicitInterface(); // error, no 'a' in 'void' 
let implImplicitMethod = impl.implicitMethod;
implImplicitMethod(); // error, no 'a' in 'void'
function explicitStructural(this: { y: number }, x: number): number {
    return x + this.y;
}
function propertyName(this: { y: number }, x: number): number {
    return x + this.notFound;
}
function voidThisSpecified(this: void, x: number): number {
    return x + this.notSpecified;
}
function noThisSpecified(x: number): number {
    // this:void unless loose-this is on
    return x + this.notSpecified;
}
let ok: {y: number, f: (this: { y: number }, x: number) => number} = { y: 12, explicitStructural };
let wrongPropertyType: {y: string, f: (this: { y: number }, x: number) => number} = { y: 'foo', explicitStructural };
let wrongPropertyName: {wrongName: number, f: (this: { y: number }, x: number) => number} = { wrongName: 12, explicitStructural };

ok.f(); // not enough arguments
ok.f('wrong type');
ok.f(13, 'too many arguments');
wrongPropertyType.f(13);
wrongPropertyName.f(13);

let c = new C();
c.explicitC();
c.explicitC('wrong type');
c.explicitC(13, 'too many arguments');
c.explicitThis();
c.explicitThis('wrong type 2');
c.explicitThis(14, 'too many arguments 2');
c.implicitThis();
c.implicitThis('wrong type 2');
c.implicitThis(14, 'too many arguments 2');
c.explicitProperty();
c.explicitProperty('wrong type 3');
c.explicitProperty(15, 'too many arguments 3');

// oops, this triggers contextual typing, which needs to be updated to understand that =>'s `this` is void.
let specifiedToImplicitVoid: (x: number) => number = explicitStructural;

let reconstructed: { 
    explicitProperty: (this: {n : number}, m: number) => number,
    explicitC: (this: C, m: number) => number,
    explicitThis: (this: this, m: number) => number,
    implicitThis: (m: number) => number,
    explicitVoid: (this: void, m: number) => number,
    n: number,
} = { 
    explicitProperty: c.explicitProperty, 
    explicitC: c.explicitC, 
    explicitThis: c.explicitThis, 
    implicitThis: c.implicitThis, 
    explicitVoid: c.explicitVoid,
    n: 12 
};

// lambdas have this: void for assignability purposes (and this unbound (free) for body checking)
let d = new D();
let explicitXProperty: (this: { x: number }, m: number) => number;

// can't name parameters 'this' in a lambda.
c.explicitProperty = (this, m) => m + this.n;

// from differing object types
c.explicitC = function(this: D, m: number) { return this.x + m };
c.explicitProperty = explicitXProperty;

c.explicitC = d.implicitD;
c.explicitC = d.explicitD;
c.explicitC = d.explicitThis;
c.explicitThis = d.implicitD;
c.explicitThis = d.explicitD;
c.explicitThis = d.explicitThis;
c.explicitProperty = d.explicitD;
c.explicitProperty = d.implicitD;
c.explicitThis = d.explicitThis;
c.explicitVoid = d.implicitD;
c.explicitVoid = d.explicitD;
c.explicitVoid = d.explicitThis;


///// parse errors /////
declare function notFirst(a: number, this: C): number;
declare function modifiers(async this: C): number;
declare function restParam(...this: C): number;
declare function optional(this?: C): number;
declare function decorated(@deco() this: C): number;
function initializer(this: C = new C()): number {
    return this.n;
}

//// [thisTypeInFunctionsNegative.js]
var _this = this;
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
        return this.n + m; // 'n' doesn't exist on type 'void'.
    };
    return C;
}());
var D = (function () {
    function D() {
    }
    D.prototype.explicitThis = function (this, m) {
        return this.x + m;
    };
    D.prototype.explicitD = function (this, m) {
        return this.x + m;
    };
    D.prototype.implicitD = function (m) {
        return this.x + m;
    };
    return D;
}());
var impl = {
    a: 12,
    explicitVoid1: function () {
        return this.a; // error, no 'a' in 'void'
    },
    explicitVoid2: function () { return _this.a; },
    explicitStructural: function () { return 12; },
    explicitInterface: function () { return 12; },
    implicitMethod: function () {
        return this.a; // ok, I.a: number
    },
    implicitFunction: function () { return this.a; } // TODO: error 'a' not found in 'void'
};
var implExplicitStructural = impl.explicitStructural;
implExplicitStructural(); // error, no 'a' in 'void'
var implExplicitInterface = impl.explicitInterface;
implExplicitInterface(); // error, no 'a' in 'void' 
var implImplicitMethod = impl.implicitMethod;
implImplicitMethod(); // error, no 'a' in 'void'
function explicitStructural(this, x) {
    return x + this.y;
}
function propertyName(this, x) {
    return x + this.notFound;
}
function voidThisSpecified(this, x) {
    return x + this.notSpecified;
}
function noThisSpecified(x) {
    // this:void unless loose-this is on
    return x + this.notSpecified;
}
var ok = { y: 12, explicitStructural: explicitStructural };
var wrongPropertyType = { y: 'foo', explicitStructural: explicitStructural };
var wrongPropertyName = { wrongName: 12, explicitStructural: explicitStructural };
ok.f(); // not enough arguments
ok.f('wrong type');
ok.f(13, 'too many arguments');
wrongPropertyType.f(13);
wrongPropertyName.f(13);
var c = new C();
c.explicitC();
c.explicitC('wrong type');
c.explicitC(13, 'too many arguments');
c.explicitThis();
c.explicitThis('wrong type 2');
c.explicitThis(14, 'too many arguments 2');
c.implicitThis();
c.implicitThis('wrong type 2');
c.implicitThis(14, 'too many arguments 2');
c.explicitProperty();
c.explicitProperty('wrong type 3');
c.explicitProperty(15, 'too many arguments 3');
// oops, this triggers contextual typing, which needs to be updated to understand that =>'s `this` is void.
var specifiedToImplicitVoid = explicitStructural;
var reconstructed = {
    explicitProperty: c.explicitProperty,
    explicitC: c.explicitC,
    explicitThis: c.explicitThis,
    implicitThis: c.implicitThis,
    explicitVoid: c.explicitVoid,
    n: 12
};
// lambdas have this: void for assignability purposes (and this unbound (free) for body checking)
var d = new D();
var explicitXProperty;
// can't name parameters 'this' in a lambda.
c.explicitProperty = (this, m);
m + this.n;
// from differing object types
c.explicitC = function (this, m) { return this.x + m; };
c.explicitProperty = explicitXProperty;
c.explicitC = d.implicitD;
c.explicitC = d.explicitD;
c.explicitC = d.explicitThis;
c.explicitThis = d.implicitD;
c.explicitThis = d.explicitD;
c.explicitThis = d.explicitThis;
c.explicitProperty = d.explicitD;
c.explicitProperty = d.implicitD;
c.explicitThis = d.explicitThis;
c.explicitVoid = d.implicitD;
c.explicitVoid = d.explicitD;
c.explicitVoid = d.explicitThis;
new C();
number;
{
    return this.n;
}
