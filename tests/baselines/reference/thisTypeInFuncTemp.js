//// [thisTypeInFuncTemp.ts]
function f(this: { y: number } = { y: 1 }, x: number = 2) {
    return x + this.y;
}

//// [thisTypeInFuncTemp.js]
function f(_a, x) {
    var _b = _a.y,  = _b === void 0 ? 1 : _b;
    if (x === void 0) { x = 2; }
    return x + this.y;
}
