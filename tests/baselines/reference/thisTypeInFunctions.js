//// [thisTypeInFunctions.ts]
function f(this: { y: number }, x: number): number {
    return x + this.y;
}
let obj: {y: number, f: (this: { y: number }, x: number) => number} = { y: 12, f };

obj.f(13); // 25!!!!

//// [thisTypeInFunctions.js]
function f(this, x) {
    return x + this.y;
}
var obj = { y: 12, f: f };
obj.f(13); // 25!!!!
