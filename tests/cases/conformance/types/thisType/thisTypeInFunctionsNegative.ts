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
	thisPassthrough(this: this, m: number): number {
		return this.x + m;
	}
	explicitD(this: D, m: number): number {
		return this.x + m;
	}
	implicitD(m: number): number {
		return this.x + m;
	}
}
function f(this: { y: number }, x: number): number {
    return x + this.y;
}
function propertyName(this: { y: number }, x: number): number {
    return x + this.notFound;
}
function voidThisSpecified(this: void, x: number): number {
    return x + this.notSpecified;
}
let ok: {y: number, f: (this: { y: number }, x: number) => number} = { y: 12, f };
let wrongPropertyType: {y: string, f: (this: { y: number }, x: number) => number} = { y: 'foo', f };
let wrongPropertyName: {wrongName: number, f: (this: { y: number }, x: number) => number} = { wrongName: 12, f };

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
let voidToSpecified: (this: { y: number }, x: number) => number = x => x + this.y;
let specifiedLambda: (this: void, x: number) => number = x => x + 12;
let specifiedLambdaToSpecified: (this: {y: number}, x: number) => number = specifiedLambda;

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
c.explicitC = n => n;
c.explicitThis = n => n;
c.explicitProperty = n => n;

// from differing object types
c.explicitC = function(this: D, m: number) { return this.x + m };
c.explicitProperty = explicitXProperty;

c.explicitC = d.implicitD;
c.explicitC = d.explicitD;
c.explicitC = d.thisPassthrough;
c.explicitThis = d.implicitD;
c.explicitThis = d.explicitD;
c.explicitThis = d.thisPassthrough;
c.explicitProperty = d.explicitD;
c.explicitProperty = d.implicitD;
c.explicitThis = d.thisPassthrough;

