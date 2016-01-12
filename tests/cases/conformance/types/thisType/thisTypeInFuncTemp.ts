namespace creat {
    export function g<T>(array: T[]) {
        if (array.length === 0) {
            return undefined;
        }
        return array[array.length - 1];
    }
}

class D {
	constructor(public d: number = 12) {
	}
    f() {
        return this.d;
    }
}
class E {
	h() {
		return creat.g([new D()]).f();
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
    //explicitThis() {
        //return this.a;
    //}
    implicitMethod() {
        return this.a;
    },
    implicitFunction() {
        return this.a; // error, no 'a' in void
    },
    explicitInterface() { return this.a; },// TODO: Says this has a void return type -- () => 12,
    explicitStructural() { return this.a; }, // TODO: same -- () => 12,
    explicitVoid1: () => 12,
    explicitVoid2: () => this.a, // sadly, this is bound (in this case to window/node) so we'll keep its type as any
}