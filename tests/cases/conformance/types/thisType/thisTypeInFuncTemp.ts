class C {
    x: number
    public implicit(): number { return this.x; }
    explicit(this: C): number { return this.x; }
}
let c = new C();
let s = c.implicit();
let n = c.explicit();
class F extends C {
    y: number
}
class D {
    y: number
    implicit(): number { return this.y; }
}
class E extends D {
    x: number
}
let d = new D();
let e = new E();
let f = new F();
f.implicit = d.implicit // ok, 'y' in { x: number, y: number }
c.explicit = d.implicit // error, 'y' not in { x: number }
c.implicit = d.implicit // error, 'y' not in { x: number }
c.implicit = e.implicit // error, 'y' not in { x: number }
c.explicit = e.implicit // error, 'y' not in { x: number }
f.explicit = d.implicit // ok 'y' in { x: number, y: number }
