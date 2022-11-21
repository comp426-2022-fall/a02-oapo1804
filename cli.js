#!/usr/bin/env node
var moment = require('moment-timezone');
//var fetch = require('node-fetch');
// how to require node fetch, doesnt support ES6 REQuire syntax
// more info on -j
// start date and end date do we put the same date
const [,, ...args] = process.argv
if (args.includes("-h")) {
  console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n"
    + "\t-h            Show this help message and exit.\n"
    + "\t-n, -s        Latitude: N positive; S negative.\n"
    + "\t-e, -w        Longitude: E positive; W negative.\n"
    + "\t-z            Time zone: uses tz.guess() from moment-timezone by default.\n"
    + "\t-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.\n"
    + "\t-j            Echo pretty JSON from open-meteo API and exit.\n")
  process.exit(0);
}
console.log( `Hello World ${args}`)
let getOption = (option, fallback) => {
  let result = fallback;
  let optionPos = args.indexOf(option)
  if(optionPos > -1) {
    result = args[optionPos+1];
  }
  return result;
}

const z = getOption("-z", moment.tz.guess());
const n = getOption("-n");
const e = getOption("-e");
const s = getOption("-s");
const w = getOption("-w");
const latitude = n ? n : (s ? -1*s : undefined);
const longitude = e ? e : (w ? -1*w : undefined);
const d = getOption("-d", 1);

let url = "https://api.open-meteo.com/v1/forecast?";
if(latitude) {
  url += "latitude=" + latitude + "&";
}
if(longitude) {
  url += "longitude=" + longitude + "&";
}
let today = new Date();
today.setDate(today.getDate() + Number(d));
start_date = today.toISOString().split("T")[0];
url += "start_date=" + start_date + "&";
url += "end_date=" + start_date + "&";
url += "timezone=" + z;
console.log(url);
const example = 'https://api.open-meteo.com/v1/forecast?latitude=35.92&longitude=-79.06&hourly=temperature_2m&timezone=America%2FAnchorage&start_date=2022-11-17&end_date=2022-11-17'
//console.log(latitude + " " + longitude + " " + d)

// const start = async function() {
//   const response = await fetch(url);
//   const data = await response.json();
//   console.log(data);
// }

//start();
// if(args.includes("-j")) {
//   // Make a request
//   const response = await fetch(url);
// }