function f(this: { y: number }, x: number): number {
    return x + this.y;
}
let obj: {y: number, f: (this: { y: number }, x: number) => number} = { y: 12, f };

obj.f(13); // 25!!!!