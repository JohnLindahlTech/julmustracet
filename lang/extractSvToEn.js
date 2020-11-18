/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const fs = require("fs");
const path = require("path");

const myArgs = process.argv.slice(2);

const allowedArgs = ["-h", "-s", "-i"];

function printHelp() {
  console.log("Available arguments:");
  console.log("\t-h\tPrints this help.");
  console.log("\t-s\tSilent will not print results.");
  console.log("\t-i\tInline, will write directly to en.json");
}

if (myArgs.find((a) => !allowedArgs.includes(a))) {
  console.log(`Invalid arguments present: ${myArgs.join(" ")}`);
  printHelp();
  return;
}

if (myArgs.indexOf("-h") >= 0) {
  printHelp();
  return;
}

const inline = myArgs.indexOf("-i") >= 0;
const silent = myArgs.indexOf("-s") >= 0;

const svPath = path.join(__dirname, "sv.json");
const enPath = path.join(__dirname, "en.json");
const enWritePath = path.join(__dirname, "en2.json");

const rawSVdata = fs.readFileSync(svPath);
const sv = JSON.parse(rawSVdata);

const rawENdata = fs.readFileSync(enPath);
const en = JSON.parse(rawENdata);

let hasAdditions = false;
let hasRemovals = false;

const enAdded = Object.entries(sv).reduce((res, [key, value]) => {
  if (en[key]) {
    res[key] = en[key];
  } else {
    hasAdditions = true;
    res[key] = `NON_TRANSLATED:${value}`;
  }
  return res;
}, en);

const enChanged = Object.entries(enAdded).reduce((res, [key, value]) => {
  if (sv[key]) {
    res[key] = value;
  } else {
    hasRemovals = true;
    res[key] = `DELETED:${value}`;
  }
  return res;
}, {});

if (!silent) {
  if (hasAdditions) {
    if (hasRemovals) {
      console.log("Has both added swedish and deleted english translations.");
    } else {
      console.log("Has added swedish translations.");
    }
  } else {
    if (hasRemovals) {
      console.log("Has deleted english translations.");
    } else {
      console.log("No changes, will not write new file.");
      return;
    }
  }
}

const enOutput = JSON.stringify(enChanged, null, 2);
fs.writeFileSync(inline ? enPath : enWritePath, enOutput);
