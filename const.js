'use strict';

// Wit.ai parameters
const WIT_TOKEN = "G52VD2KD5IE6AORKEYQXYYBDZFCXTBGR";
if (!WIT_TOKEN) {
  throw new Error('missing WIT_TOKEN');
}

// Messenger API parameters
const FB_PAGE_TOKEN = "EAAJDkEuekfwBAIJ7mwVVIp0ZCpR9omiHniBv5CZAl249aIQZB88aAVxM4Vw5qwZBktZA7JBMrwdOreURaqg0uh6Kmzz3o457dWV7z3N4gg8z2QDeIgcYtuLZCvPknitbpItC6P6ZBA4A6mnQZB5vZAxk4oz6GtHqeriZAZCvdvtfOKpBQZDZD";
const APP_SECRET="f644ed06c3fdfbc110d68cd573ef98d9";
var FB_VERIFY_TOKEN = "iamthebest";
var SERVER_URL="https://chooseyourfood.herokuapp.com";
if (!FB_VERIFY_TOKEN) {
  FB_VERIFY_TOKEN = "iamthebest";
}

module.exports = {
  WIT_TOKEN: WIT_TOKEN,
  FB_PAGE_TOKEN: FB_PAGE_TOKEN,
  FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
  APP_SECRET:APP_SECRET,
  SERVER_URL:SERVER_URL
};