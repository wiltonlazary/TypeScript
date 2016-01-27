//// [looseThisTypeInFunctions.ts]
class C {
    n: number;
    explicitThis(this: this, m: number): number {
        return this.n + m;
    }
    implicitThis(m: number): number {
        return this.n + m;
    }
    explicitVoid(this: void, m: number): number {
        return m + 1;
    }
}
let c = new C();
c.explicitVoid = c.explicitThis; // error, 'void' is missing everything
declare let o: { 
	implicitThis(m: number): number, 
};
c.explicitVoid = c.implicitThis // ok, implicitThis(this:any)
o.implicitThis = c.implicitThis; // ok, implicitThis(this:any)
o.implicitThis = c.explicitThis; // ok, implicitThis(this:any) is assignable to explicitThis(this: this)


//// [looseThisTypeInFunctions.js]
var C = (function () {
    function C() {
    }
    C.prototype.explicitThis = function (m) {
        return this.n + m;
    };
    C.prototype.implicitThis = function (m) {
        return this.n + m;
    };
    C.prototype.explicitVoid = function (m) {
        return m + 1;
    };
    return C;
}());
var c = new C();
c.explicitVoid = c.explicitThis; // error, 'void' is missing everything
c.explicitVoid = c.implicitThis; // ok, implicitThis(this:any)
o.implicitThis = c.implicitThis; // ok, implicitThis(this:any)
o.implicitThis = c.explicitThis; // ok, implicitThis(this:any) is assignable to explicitThis(this: this)
