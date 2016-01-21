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
let c = new C();
let reconstructed: { 
	n: number,
	explicitThis(this: C, m: number): number,
	implicitThis(m: number): number,
	explicitC(this: C, m: number): number,
    explicitProperty: (this: {n : number}, m: number) => number,
    explicitVoid(this: void, m: number): number,
} = { 
    n: 12,
    explicitThis: c.explicitThis,
    implicitThis: c.implicitThis,
    explicitC: c.explicitC,
    explicitProperty: c.explicitProperty,
    explicitVoid: c.explicitVoid
};
reconstructed.explicitProperty(11);
reconstructed.implicitThis(11);