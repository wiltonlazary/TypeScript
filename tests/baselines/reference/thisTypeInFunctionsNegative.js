//// [thisTypeInFunctionsNegative.ts]
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


//// [thisTypeInFunctionsNegative.js]
function f(this, x) {
    return x + this.y;
}
function propertyName(this, x) {
    return x + this.notFound;
}
function voidThisSpecified(this, x) {
    return x + this.notSpecified;
}
var ok = { y: 12, f: f };
var wrongPropertyType = { y: 'foo', f: f };
var wrongPropertyName = { wrongName: 12, f: f };
ok.f(); // not enough arguments
ok.f('wrong type');
ok.f(13, 'too many arguments');
wrongPropertyType.f(13);
wrongPropertyName.f(13);
