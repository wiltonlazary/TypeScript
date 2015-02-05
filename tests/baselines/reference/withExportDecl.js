//// [withExportDecl.ts]
var simpleVar;
export var exportedSimpleVar;

var anotherVar: any;
var varWithSimpleType: number;
var varWithArrayType: number[];

var varWithInitialValue = 30;
export var exportedVarWithInitialValue = 70;

var withComplicatedValue = { x: 30, y: 70, desc: "position" };
export var exportedWithComplicatedValue = { x: 30, y: 70, desc: "position" };

declare var declaredVar;
declare var declareVar2

declare var declaredVar;
declare var deckareVarWithType: number;
export declare var exportedDeclaredVar: number;

var arrayVar: string[] = ['a', 'b'];

export var exportedArrayVar: { x: number; y: string; }[] ;
exportedArrayVar.push({ x: 30, y : 'hello world' });

function simpleFunction() {
    return {
        x: "Hello",
        y: "word",
        n: 2
    };
}

export function exportedFunction() {
    return simpleFunction();
}

module m1 {
    export function foo() {
        return "Hello";
    }
}
declare export module m2 {

    export var a: number;
}


export module m3 {

    export function foo() {
        return m1.foo();
    }
}

export var eVar1, eVar2 = 10;
var eVar22;
export var eVar3 = 10, eVar4, eVar5;

//// [withExportDecl.js]
define(["require", "exports"], function (require, exports) {
    var simpleVar;
    exports.exportedSimpleVar;
    var anotherVar;
    var varWithSimpleType;
    var varWithArrayType;
    var varWithInitialValue = 30;
    exports.exportedVarWithInitialValue = 70;
    var withComplicatedValue = { x: 30, y: 70, desc: "position" };
    exports.exportedWithComplicatedValue = { x: 30, y: 70, desc: "position" };
    var arrayVar = ['a', 'b'];
    exports.exportedArrayVar;
    exports.exportedArrayVar.push({ x: 30, y: 'hello world' });
    function simpleFunction() {
        return {
            x: "Hello",
            y: "word",
            n: 2
        };
    }
    function exportedFunction() {
        return simpleFunction();
    }
    exports.exportedFunction = exportedFunction;
    var m1;
    (function (m1) {
        function foo() {
            return "Hello";
        }
        m1.foo = foo;
    })(m1 || (m1 = {}));
    var m3;
    (function (m3) {
        function foo() {
            return m1.foo();
        }
        m3.foo = foo;
    })(m3 = exports.m3 || (exports.m3 = {}));
    exports.eVar1, exports.eVar2 = 10;
    var eVar22;
    exports.eVar3 = 10, exports.eVar4, exports.eVar5;
});
