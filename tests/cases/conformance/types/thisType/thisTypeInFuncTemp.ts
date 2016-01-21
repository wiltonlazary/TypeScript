class Base1 {
    x: number;
    public implicit(): number { return this.x; }
    explicit(this: Base1): number { return this.x; }
    static implicitStatic(): number { return this.y; }
    static y: number;

}