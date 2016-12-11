'use strict';

// See the Send API reference
// https://developers.facebook.com/docs/messenger-platform/send-api-reference
const request = require('request');
var curl = require('curlrequest');
const Config = require('./const.js');
const messageTypes = require('./message.js');
var titleCase = require('title-case');
var restaurantService = require('./services/restaurant.service.js');
var productService = require('./services/product.service.js');
const Wit = require('node-wit').Wit;
const interactive = require('node-wit').interactive;

const accessToken = (() => {
  // if (process.argv.length !== 3) {
  //   console.log('usage: node examples/joke.js <wit-access-token>');
  //   process.exit(1);
  // }
  return Config.WIT_TOKEN;
})();
const sessions = {};
const findOrCreateSession = (fbid) => {
  let sessionId;
  // Let's see if we already have a session for the user fbid
  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid === fbid) {
      // Yep, got it!
      sessionId = k;
    }
  });
  if (!sessionId) {
    // No session found for user fbid, let's create a new one
    sessionId = new Date().toISOString();
    sessions[sessionId] = {
      fbid: fbid,
      context: {
        _fbid_: fbid
      }
    }; // set context, _fid_
  }
  return sessionId;
};


const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
    ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

// Bot actions
const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    console.log('sending...', JSON.stringify(response));
    var finalText;
    console.log("entities in actions are------------------:", entities);
    if (context.name != undefined) {
      // console.log("context name is", context.name);

      finalText = context.name["first_name"] + "," + text;
    }
    else
      finalText = text;
    if (context.rating != undefined) {
      var ratingProduct = JSON.parse(context.rating);
      console.log("request is", ratingProduct);
      restaurantService.updateRating(request.text, ratingProduct.restaurant, ratingProduct.product).then(function(updatedRating){
        messageTypes.sendTextMessage(context._fbid_,"Rating added successfully. Thanks for your valuable review :)");
        console.log("done in rating product");
        return Promise.resolve();
      })
    } else
      if (context.demand != undefined) {
        if (context.demand != false) {
          // console.log("context name is", context.name);
          messageTypes.sendListMessage(context._fbid_, context.demand);
          return Promise.resolve();
        } else {
          finalText = "we couldn't find any non available products in your area which people want "
          messageTypes.sendTextMessage(context._fbid_, finalText);
          return Promise.resolve();
        }
      }
      else
        if (firstEntityValue(entities, 'stop') != undefined) {

          messageTypes.sendTextMessage(context._fbid_, ":)");
          return Promise.resolve();
        }
        else
          if (context.productShops) {
            messageTypes.sendGenericMessage(context._fbid_, context.productShops, context.product);
            delete context.productNotFound;
            return Promise.resolve();
          }
          else
            if (context.productNotFound) {
              messageTypes.sendTextMessage(context._fbid_, finalText);
              delete context.productShops;
              return Promise.resolve();
            }
            else
              if (request.text == "Postback called") {
                messageTypes.sendTextMessage(context._fbid_, "Give your rating for the speciality you choose");
                return Promise.resolve();
              } else {
                  messageTypes.sendTextMessage(context._fbid_, finalText);
                  return Promise.resolve();
              }
              
    
  },
  fetchProductInfo({ context, entities }) {
    return new Promise(function (resolve, reject) {
      console.log("entites are", entities);
      var product = firstEntityValue(entities, 'product');
      console.log("before sending getProduct---------------");
      context.product = titleCase(product);
      return resolve(context);
    });
  },
  getProduct({ context, entities }) {
    return new Promise(function (resolve, reject) {
      console.log("entites are", entities, context);
      var location = firstEntityValue(entities, 'location');
      location = titleCase(location);
      if (location) {
        restaurantService.getRestroBasedOnProductAndLocation(context.product, location).then(function (products) {
          console.log("products are", products);
          if (products.length == 0) {
            console.log("added missing product in facebook.js get product");
            productService.addProduct(context.product, location).then(function (productAdded) {
              context.productNotFound = context.product;
              context.done = "done";
              return resolve(context);
            });
          }
          else {
            context.productShops = JSON.parse(JSON.stringify(products));
            context.done = "done";
            return resolve(context);
          }
          // console.log("context in actions is ", context);
        }); // we should call a product API here
        //  context.productShops= "in zomato";
        // delete context.missingLocation;
      } else {
        delete context.productShops;
        console.log("some alternate flow");
        return context;
      }
      console.log("before sending getProduct---------------");

    });
  },
  //vendor specific action 
  lookItems({ context, entities }) {
    return new Promise(function (resolve, reject) {
      console.log("inside look items");
      var location = firstEntityValue(entities, 'location');
      location = titleCase(location);
      if (location) {
        productService.getProductsInDemand(location).then(function (products) {
          console.log("products are", products);
          if (products.length == 0)
            context.demand = false;
          else
            context.demand = JSON.parse(JSON.stringify(products));
          console.log("context is", context);
          context.done = "done";
          return resolve(context);
          // console.log("context in actions is ", context);
        });
      }
      return resolve(context);
    });
  }
};

const wit = new Wit({ accessToken, actions });
interactive(wit);

/*
 * Authorization Event
 *
 * The value for 'optin.ref' is defined in the entry point. For the "Send to 
 * Messenger" plugin, it is the 'data-ref' field. Read more at 
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/authentication
 *
 */
function receivedAuthentication(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfAuth = event.timestamp;

  // The 'ref' field is set in the 'Send to Messenger' plugin, in the 'data-ref'
  // The developer can set this to an arbitrary value to associate the 
  // authentication callback with the 'Send to Messenger' click event. This is
  // a way to do account linking when the user clicks the 'Send to Messenger' 
  // plugin.
  var passThroughParam = event.optin.ref;

  console.log("Received authentication for user %d and page %d with pass " +
    "through param '%s' at %d", senderID, recipientID, passThroughParam,
    timeOfAuth);

  // When an authentication is received, we'll send a message back to the sender
  // to let them know it was successful.
  sendTextMessage(senderID, "Authentication successful");
};

/*
 * Message Event
 *
 * This event is called when a message is sent to your page. The 'message' 
 * object format can vary depending on the kind of message that was received.
 * Read more at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
 *
 * For this example, we're going to echo any text that we get. If we get some 
 * special keywords ('button', 'generic', 'receipt'), then we'll send back
 * examples of those bubbles to illustrate the special message bubbles we've 
 * created. If we receive a message with an attachment (image, video, audio), 
 * then we'll simply confirm that we've received the attachment.
 * 
 */
function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;
  if (event.postback != undefined)
    var payload = event.postback.payload;
  console.log("Received message for user %d and page %d at %d with message:",
    senderID, recipientID, timeOfMessage);
  console.log("Message is---------------------------", JSON.stringify(message));

  var isEcho = message.is_echo;
  var messageId = message.mid;
  var appId = message.app_id;
  var metadata = message.metadata;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;
  var quickReply = message.quick_reply;

  if (isEcho) {
    // Just logging message echoes to console
    console.log("Received echo for message %s and app %d with metadata %s",
      messageId, appId, metadata);
    return;
  } else if (quickReply) {
    var quickReplyPayload = quickReply.payload;
    console.log("Quick reply for message %s with payload %s",
      messageId, quickReplyPayload);

    messageTypes.sendTextMessage(senderID, "Quick reply tapped");
    return;
  }

  if (messageText) {
    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText) {
      // case 'image':
      //   messageTypes.sendImageMessage(senderID);
      //   break;

      // case 'gif':
      //   messageTypes.sendGifMessage(senderID);
      //   break;

      // case 'audio':
      //   messageTypes.sendAudioMessage(senderID);
      //   break;

      // case 'video':
      //   messageTypes.endVideoMessage(senderID);
      //   break;

      // case 'file':
      //   messageTypes.sendFileMessage(senderID);
      //   break;

      // case 'button':
      //   messageTypes.sendButtonMessage(senderID);
      //   break;

      case 'booking details':
        messageTypes.sendPayMessage(senderID);
        break;

       case 'booking':
        messageTypes.sendPayMessage(senderID);
        break;  
       
       case 'book':
        messageTypes.sendPayMessage(senderID);
        break; 
  
      // case 'booking':
      //   messageTypes.sendcheckinMessage(senderID);
      //   break;

      // case 'book':
      //   messageTypes.sendcheckinMessage(senderID);
      //   break;  

      // case 'receipt':
      //   messageTypes.sendReceiptMessage(senderID);
      //   break;

      case 'quick reply':
        messageTypes.sendQuickReply(senderID);
        break;

      case 'read receipt':
        messageTypes.sendReadReceipt(senderID);
        break;

      case 'typing on':
        messageTypes.sendTypingOn(senderID);
        break;

      case 'typing off':
        messageTypes.sendTypingOff(senderID);
        break;

      case 'account linking':
        messageTypes.sendAccountLinking(senderID);
        break;

      default:
        const sessionId = findOrCreateSession(senderID);
        wit.runActions(
          sessionId, // the user's current session
          messageText, // the user's message
          sessions[sessionId].context // the user's current session state
        ).then((context) => {
          console.log('Waiting for next user messages', context);
          if (context.name == undefined) {
            request('https://graph.facebook.com/v2.6/' + context._fbid_ + '?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=' + Config.FB_PAGE_TOKEN, function (error, response, body) {
              if (!error) {
                console.log(body);// Show the HTML for the Google homepage. 
                var data = JSON.parse(body);
                context["name"] = data;
                console.log("context after modification", context);
              }
              else
                console.log("error is", error);
            });
          }
          if (payload != undefined) {
            console.log("inside payload check ", payload);
            context["rating"] = payload;
            // messageTypes.sendTextMessage(senderID, "Give rating out of 5 for the speciality item");
          }else
                if(context.rating!=undefined){
                  delete context.rating;
                }          
          // Based on the session state, you might want to reset the session.
          // This depends heavily on the business logic of your bot.
          // Example:
          if (context['done']!=undefined) {
            console.log("done");
            delete context.productShops;
            delete context.product;
            delete context.productNotFound;
            delete context.done;
            delete context.demand;
            delete context.rating;  
            // delete sessions[sessionId];
          }
          // Updating the user's current session state
          sessions[sessionId].context = context;
          // delete sessions[sessionId];
        })
          .catch((err) => {
            console.error('Oops! Got an error from Wit: ', err.stack || err);
          })
    }
  } else if (messageAttachments) {
    messageTypes.sendTextMessage(senderID, "Message with attachment received");
  }
};

/*
 * Delivery Confirmation Event
 *
 * This event is sent to confirm the delivery of a message. Read more about 
 * these fields at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-delivered
 *
 */
function receivedDeliveryConfirmation(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var delivery = event.delivery;
  var messageIDs = delivery.mids;
  var watermark = delivery.watermark;
  var sequenceNumber = delivery.seq;

  if (messageIDs) {
    messageIDs.forEach(function (messageID) {
      console.log("Received delivery confirmation for message ID: %s",
        messageID);
    });
  }

  console.log("All message before %d were delivered.", watermark);
}


/*
 * Postback Event
 *
 * This event is called when a postback is tapped on a Structured Message. 
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
 * 
 */
function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;
  console.log("event in postback is", event);
  // The 'payload' param is a developer-defined field which is set in a postback 
  // button for Structured Messages. 
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " +
    "at %d", senderID, recipientID, payload, timeOfPostback);
  event.message = {};
  event.message.text = "Postback called";
  // When a postback is called, we'll send a message back to the sender to 
  // let them know it was successful
  // messageTypes.sendTextMessage(senderID, "Postback called");
  receivedMessage(event);
}

/*
 * Message Read Event
 *
 * This event is called when a previously-sent message has been read.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-read
 * 
 */
function receivedMessageRead(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;

  // All messages before watermark (a timestamp) or sequence have been seen.
  var watermark = event.read.watermark;
  var sequenceNumber = event.read.seq;

  console.log("Received message read event for watermark %d and sequence " +
    "number %d", watermark, sequenceNumber);
}

/*
 * Account Link Event
 *
 * This event is called when the Link Account or UnLink Account action has been
 * tapped.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/account-linking
 * 
 */
function receivedAccountLink(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;

  var status = event.account_linking.status;
  var authCode = event.account_linking.authorization_code;

  console.log("Received account link event with for user %d with status %s " +
    "and auth code %s ", senderID, status, authCode);
}


module.exports = {
  receivedAuthentication: receivedAuthentication,
  receivedMessage: receivedMessage,
  receivedDeliveryConfirmation: receivedDeliveryConfirmation,
  receivedPostback: receivedPostback,
  receivedMessageRead: receivedMessageRead,
  receivedAccountLink: receivedAccountLink

};