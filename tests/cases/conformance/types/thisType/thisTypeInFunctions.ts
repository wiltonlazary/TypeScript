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
function explicitStructural(this: { y: number }, x: number): number {
    return x + this.y;
}
function justThis(this: { y: number }): number {
    return this.y;
}
function implicitThis(n: number): number {
    return 12;
}
let impl: I = {
    a: 12,
    explicitVoid2: () => this.a, // ok, this: any because it refers to some outer object (window?)
    explicitVoid1() { return 12; },
    explicitStructural() {
        return this.a;
    },
    explicitInterface() {
        return this.a;
    },
    //explicitThis() {
        //return this.a;
    //}
    implicitMethod() {
        return this.a;
    },
    implicitFunction: () => this.a, // ok, this: any because it refers to some outer object (window?)
}
impl.explicitVoid1 = function () { return 12; };
impl.explicitVoid2 = () => 12;
impl.explicitStructural = function() { return this.a; };
impl.explicitInterface = function() { return this.a; };
impl.explicitStructural = () => 12;
impl.explicitInterface = () => 12;
// impl.explicitThis = function () { return this.a; };
impl.implicitMethod = function () { return this.a; };
impl.implicitMethod = () => 12;
impl.implicitFunction = () => this.a; // ok, this: any because it refers to some outer object (window?)
// parameter checking
let ok: {y: number, f: (this: { y: number }, x: number) => number} = { y: 12, f: explicitStructural };
let implicitAnyOk: {notSpecified: number, f: (x: number) => number} = { notSpecified: 12, f: implicitThis };
ok.f(13);
implicitThis(12);
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
let unboundToSpecified: (this: { y: number }, x: number) => number = x => x + this.y; // ok, this:any
let specifiedToSpecified: (this: {y: number}, x: number) => number = explicitStructural;
let anyToSpecified: (this: { y: number }, x: number) => number = function(x: number): number { return x + 12; };

let unspecifiedLambda: (x: number) => number = x => x + 12;
let specifiedLambda: (this: void, x: number) => number = x => x + 12;
let unspecifiedLambdaToSpecified: (this: {y: number}, x: number) => number = unspecifiedLambda;
let specifiedLambdaToSpecified: (this: {y: number}, x: number) => number = specifiedLambda;


let explicitCFunction: (this: C, m: number) => number;
let explicitPropertyFunction: (this: {n: number}, m: number) => number;
c.explicitC = explicitCFunction;
c.explicitC = function(this: C, m: number) { return this.n + m };
c.explicitProperty = explicitPropertyFunction;
c.explicitProperty = function(this: {n: number}, m: number) { return this.n + m };
c.explicitProperty = reconstructed.explicitProperty;

// lambdas are assignable to anything
c.explicitC = m => m;
c.explicitThis = m => m;
c.explicitProperty = m => m;

// this inside lambdas refer to outer scope
// the outer-scoped lambda at top-level is still just `any`
c.explicitC = m => m + this.n;
c.explicitThis = m => m + this.n;
c.explicitProperty = m => m + this.n;

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