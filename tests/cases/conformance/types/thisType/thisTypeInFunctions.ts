function f(this: { y: number }, x: number): number {
    return x + this.y;
}
function g(this: { y: number }, x: number): number {
    return x + this.notFound;
}
let obj: {y: number, f: (this: { y: number }, x: number) => number} = { y: 12, f };
let obj2: {y: string, f: (this: { y: number }, x: number) => number} = { y: 'foo', f };
let obj3: {wrongName: number, f: (this: { y: number }, x: number) => number} = { wrongName: 12, f };

obj.f(13, 'nope');
obj.f(13);
obj.f('nope');
obj2.f(13);
obj3.f(13);
