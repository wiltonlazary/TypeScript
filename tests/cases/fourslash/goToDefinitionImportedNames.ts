/// <reference path='fourslash.ts' />

// @Filename: b.ts
////export {/*classAliasDefinition*/Class} from "./a";


// @Filename: a.ts
////export module Module {
////}
/////*classDefinition*/export class Class {
////    private f;
////}
////export interface Interface {
////    x;
////}


verify.goToDefinition("classAliasDefinition", "classDefinition");
