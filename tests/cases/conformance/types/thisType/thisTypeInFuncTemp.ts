class C {
    x: number
    implicit(): number { return this.x; }
    explicit(this: C): number { return this.x; }
}
class D {
    y: number
    m(): number { return this.y; }
}
let c = new C();
let d = new D();
c.implicit = d.m
c.explicit = d.m
