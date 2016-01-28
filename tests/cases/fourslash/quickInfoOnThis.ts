// @strictThis: true
/// <reference path='fourslash.ts' />
////interface Restricted {
////    n: number;
////}
////function wrapper(wrapped: { (): void; }) { }
////class Foo {
////    n: number;
////    public implicitThis() {
////        wrapper(
////            function implicitVoid() {
////                console.log(th/*1*/is);
////            }
////        )
////        console.log(th/*2*/is);
////    }
////    public explicitInterface(th/*3*/is: Restricted) {
////        console.log(th/*4*/is);
////    }
////    public explicitClass(th/*5*/is: Foo) {
////        console.log(th/*6*/is);
////    }
////}
////
////function implicitVoid(x: number): void {
////    return th/*7*/is;
////}
////function explicitVoid(th/*8*/is: void, x: number): void {
////    return th/*9*/is;
////}
////function explicitInterface(th/*10*/is: Restricted): void {
////    console.log(thi/*11*/s);
////}
////function explicitLiteral(th/*12*/is: { n: number }): void {
////    console.log(th/*13*/is);
////}

goTo.marker('1');
verify.quickInfoIs('void');
goTo.marker('2');
verify.quickInfoIs('this: Foo');
goTo.marker('3');
verify.quickInfoIs('(parameter) this: Restricted');
goTo.marker('4');
verify.quickInfoIs('this: Restricted');
goTo.marker('5');
verify.quickInfoIs('(parameter) this: Foo');
goTo.marker('6');
verify.quickInfoIs('this: Foo');
goTo.marker('7');
verify.quickInfoIs('void');
goTo.marker('8');
verify.quickInfoIs('(parameter) this: void');
goTo.marker('9');
verify.quickInfoIs('void');
goTo.marker('10');
verify.quickInfoIs('(parameter) this: Restricted');
goTo.marker('11');
verify.quickInfoIs('this: Restricted');
goTo.marker('12');

verify.quickInfoIs('(parameter) this: {\n    n: number;\n}');
goTo.marker('13');
verify.quickInfoIs('this: {\n    n: number;\n}');