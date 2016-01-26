function f(this: { y: number } = { y: 1 }, x: number = 2) {
    return x + this.y;
}