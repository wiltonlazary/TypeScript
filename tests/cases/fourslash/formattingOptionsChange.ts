///<reference path="fourslash.ts"/>

/////*InsertSpaceAfterCommaDelimiter*/[1,2,   3];[ 72  ,    ];
/////*InsertSpaceAfterSemicolonInForStatements*/for (i = 0;i;    i++);
/////*InsertSpaceBeforeAndAfterBinaryOperators*/1+2-    3
/////*InsertSpaceAfterKeywordsInControlFlowStatements*/if     (true) { }
/////*InsertSpaceAfterFunctionKeywordForAnonymousFunctions*/(function               () { })
/////*InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis*/(1  )
/////*InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets*/[1  ]; [ ]; []; [,];
/////*InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces*/`${1}`;`${   1  }`
/////*InsertSpaceAfterTypeAssertion*/const bar = <Bar>    Thing.getFoo();
/////*PlaceOpenBraceOnNewLineForFunctions*/class   foo   { 
////}
/////*PlaceOpenBraceOnNewLineForControlBlocks*/if (true)   {
////}
/////*InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces*/{          var t = 1};

runTest("InsertSpaceAfterCommaDelimiter", "[1, 2, 3];[72,];", "[1,2,3];[72,];");
runTest("InsertSpaceAfterSemicolonInForStatements", "for (i = 0; i; i++);", "for (i = 0;i;i++);");
runTest("InsertSpaceBeforeAndAfterBinaryOperators", "1 + 2 - 3", "1+2-3");
runTest("InsertSpaceAfterKeywordsInControlFlowStatements", "if (true) { }", "if(true) { }");
runTest("InsertSpaceAfterFunctionKeywordForAnonymousFunctions", "(function () { })", "(function() { })");
runTest("InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis", "    ( 1 )", "    (1)");
runTest("InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets", "[ 1 ];[];[];[ , ];", "[1];[];[];[,];");
runTest("InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces", "`${ 1 }`; `${ 1 }`", "`${1}`; `${1}`");
runTest("InsertSpaceAfterTypeAssertion", "const bar = <Bar> Thing.getFoo();", "const bar = <Bar>Thing.getFoo();");
runTest("PlaceOpenBraceOnNewLineForFunctions", "class foo", "class foo {");
runTest("PlaceOpenBraceOnNewLineForControlBlocks", "if ( true )", "if ( true ) {");
runTest("InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces", "{ var t = 1 };", "{var t = 1};");


function runTest(propertyName: string, expectedStringWhenTrue: string, expectedStringWhenFalse: string) {
    // Go to the correct file
    goTo.marker(propertyName);

    // Set the option to false first
    format.setOption(propertyName, false);

    // Format
    format.document();

    // Verify
    goTo.marker(propertyName);
    verify.currentLineContentIs(expectedStringWhenFalse);

    // Set the option to true
    format.setOption(propertyName, true);

    // Format
    format.document();

    // Verify
    goTo.marker(propertyName);
    verify.currentLineContentIs(expectedStringWhenTrue);
}