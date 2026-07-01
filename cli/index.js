#!/usr/bin/env node

const command = process.argv[2];

switch (command) {
  case "sprint":
    console.log("?? Sprint command");
    break;

  case "lesson":
    console.log("?? Lesson command");
    break;

  case "new":
    console.log("? New command");
    break;

  default:
    console.log(`
ElectroBasics CLI

Commands

eb sprint
eb lesson
eb new
`);
}
