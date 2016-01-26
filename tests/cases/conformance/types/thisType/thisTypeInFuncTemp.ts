function f(this: void, x: number) {
    return x;
}
function g(y: number) {
    return y;
}
let x = f();
let y = g();