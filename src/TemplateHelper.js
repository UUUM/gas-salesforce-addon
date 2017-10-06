function include(File) {
  return HtmlService.createTemplateFromFile(File).evaluate().getContent();
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^include$" }] */
