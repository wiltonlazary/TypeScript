/// <reference path='fourslash.ts'/>

////interface [|Foo|] { }
////module [|Foo|] { export interface Bar { } }
////function [|Foo|]() { }
////
////export = [|Foo|];

const [r0, r1, r2, r3] = test.ranges();
verify.referencesOf(r3, [r0, r1, r2, r3]);
