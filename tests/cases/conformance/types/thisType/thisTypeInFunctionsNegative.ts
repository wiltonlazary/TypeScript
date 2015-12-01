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

// oops, this triggers contextual typing, which needs to be updated to understand that =>'s `this` is void.
let voidToSpecified: (this: { y: number }, x: number) => number = x => x + this.y;
let specifiedLambda: (this: void, x: number) => number = x => x + 12;
let specifiedLambdaToSpecified: (this: {y: number}, x: number) => number = specifiedLambda;
