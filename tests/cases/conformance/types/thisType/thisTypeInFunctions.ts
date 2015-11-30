function f(this: { y: number }, x: number): number {
    return x + this.y;
}
function noThisSpecified(x: number): number {
    // for backward compatibility, this: any, so this is ok
    // (until we add --noImplicitThisAny)
    return x + this.notSpecified;
}
let ok: {y: number, f: (this: { y: number }, x: number) => number} = { y: 12, f };
let implicitAnyOk: {notSpecified: number, f: (x: number) => number} = { notSpecified: 12, f: noThisSpecified };
ok.f(13);
noThisSpecified(12);
implicitAnyOk.f(12);
