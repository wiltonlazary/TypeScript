/// <reference path='fourslash.ts'/>

////// References to /*1*/foo or b/*2*/ar
/////* in comments should not find fo/*3*/o or bar/*4*/ */
////class foo { }
////var bar = 0;

for (const marker of test.markers()) {
    verify.referencesCountIs(0);
}
