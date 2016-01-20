class C {
    x: number
    public implicit(): number { return this.x; }
    explicit(this: C): number { return this.x; }
}
let c = new C();
let d = new D();
let e = new E();
let f = new F();
let n: number = c.implicit();
n = c.explicit();
class D extends C {
    y: number
}
class E {
    y: number
    implicit(): number { return this.y; }
    explicit(this: C): number { return this.x; }
}
class F extends E {
    x: number
}
c.implicit = e.implicit // error, 'this.y' not in C: { x } (c assignable to e)
d.implicit = e.implicit // error, 'y' in D: { x, y } (d assignable e) but E.implicit.this doesn't satisfy D.implicit.this (e assignable to d) (with bivariance this case is legal)

c.explicit = e.implicit // error, 'y' not in C: { x } (c assignable to e)
d.explicit = e.implicit // error, 'y' not in C: { x } (c assignable to e)

f.implicit = d.implicit // ok, 'x' and 'y' in { x, y } (d assignable to f and vice versa)
d.implicit = f.implicit // ok, 'x' and 'y' in { x, y } (f assignable to d and vice versa)
f.implicit = d.explicit // error, 'y' in { x, y } (c assignable to f) but C.implicit.this doesn't satisfy F.implicit.this (c assignable to f?) (with bivariance this case is legal)
c.implicit = f.implicit // error, 'x' and 'y' not in C: { x } (c assignable to f) (with bivarance this case is legal)
c.explicit = f.implicit // error, 'x' and 'y' not in C: { x } (c assignable to f) (with bivariance this case is legal)
