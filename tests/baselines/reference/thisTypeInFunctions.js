//// [thisTypeInFunctions.ts]
function f(this: { y: number }, x: number): number {
    return x + this.y;
}
function propertyName(this: { y: number }, x: number): number {
    return x + this.notFound;
}
function noThisSpecified(x: number): number {
    // for backward compatibility, this: any, so this is ok
    // (until we add --noImplicitThisAny)
    return x + this.notSpecified;
}
function voidThisSpecified(this: void, x: number): number {
    return x + this.notSpecified;
}
let ok: {y: number, f: (this: { y: number }, x: number) => number} = { y: 12, f };
let wrongPropertyType: {y: string, f: (this: { y: number }, x: number) => number} = { y: 'foo', f };
let wrongPropertyName: {wrongName: number, f: (this: { y: number }, x: number) => number} = { wrongName: 12, f };

ok.f(13);
ok.f('wrong type');
ok.f(13, 'too many arguments');
wrongPropertyType.f(13);
wrongPropertyName.f(13);


//// [thisTypeInFunctions.js]
function f(this, x) {
    return x + this.y;
}
function propertyName(this, x) {
    return x + this.notFound;
}
function noThisSpecified(x) {
    // for backward compatibility, this: any, so this is ok
    // (until we add --noImplicitThisAny)
    return x + this.notSpecified;
}
function voidThisSpecified(this, x) {
    return x + this.notSpecified;
}
var ok = { y: 12, f: f };
var wrongPropertyType = { y: 'foo', f: f };
var wrongPropertyName = { wrongName: 12, f: f };
ok.f(13);
ok.f('wrong type');
ok.f(13, 'too many arguments');
wrongPropertyType.f(13);
wrongPropertyName.f(13);
