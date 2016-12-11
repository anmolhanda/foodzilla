'use strict';

var _ = require('underscore');
// See the Send API reference
// https://developers.facebook.com/docs/messenger-platform/send-api-reference
const request = require('request');
const Config = require('./const.js');

/*
 * Send an image using the Send API.
 *
 */
function sendImageMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "image",
        payload: {
          url: Config.SERVER_URL + "/assets/rift.png"
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a Gif using the Send API.
 *
 */
function sendGifMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "image",
        payload: {
          url: Config.SERVER_URL + "/assets/instagram_logo.gif"
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send audio using the Send API.
 *
 */
function sendAudioMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "audio",
        payload: {
          url: Config.SERVER_URL + "/assets/sample.mp3"
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a video using the Send API.
 *
 */
function sendVideoMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "video",
        payload: {
          url: Config.SERVER_URL + "/assets/allofus480.mov"
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a file using the Send API.
 *
 */
function sendFileMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "file",
        payload: {
          url: Config.SERVER_URL + "/assets/test.txt"
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a text message using the Send API.
 *
 */
function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText,
      metadata: "DEVELOPER_DEFINED_METADATA"
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a button message using the Send API.
 *
 */
function sendButtonMessage(recipientId) {
  var messageData = {
    "recipient": {
      "id": recipientId
    },
    "message": {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [
            {
              "title": "Classic White T-Shirt",
              "item_url": "https://petersfancyapparel.com/classic_white_tshirt",
              "image_url": "https://petersfancyapparel.com/classic_white_tshirt.png",
              "subtitle": "Soft white cotton t-shirt is back in style",
              "buttons": [
                {
                  "type": "web_url",
                  "url": "https://petersfancyapparel.com/classic_white_tshirt",
                  "title": "View Item",
                  "webview_height_ratio": "tall"
                }
              ]
            }
          ]
        }
      }
    }
  }
  callSendAPI(messageData);
}

/*
 * 
 */
function sendPayMessage(recipientId) {
  var messageData = {
    "recipient": {
      "id": recipientId
    },
    "message": {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "receipt",
          "recipient_name": "Anmol Handa",
          "order_number": "12345678902",
          "merchant_name": "Oasis",
          "currency": "INR",
          "payment_method": "Card",
          "timestamp": new Date().getTime,
          "elements": [
            {
              "title": "Rice",
              "subtitle": "Jeera Rice with kesar",
              "quantity": 2,
              "price": 100,
              "currency": "INR",
              "image_url": "http://www.pachd.com/free-images/food-images/korean-bbq-01.jpg"
            },
            {
              "title": "Veg Curry",
              "subtitle": "Preparation in Hyderabadi Way",
              "quantity": 2,
              "price": 120,
              "currency": "INR",
              "image_url": "http://www.pachd.com/free-images/food-images/korean-bbq-01.jpg"
            }
          ],
          "address": {
            "street_1": "31/1, Bhoomika Layout",
            "street_2": "Pattangere",
            "city": "Raja Rajeshwari Nagar",
            "postal_code": "560098",
            "state": "Karanataka",
            "country": "India"
          },
          "summary": {
            "subtotal": 440.00,
            "shipping_cost": 20.00,
            "total_tax": 50.00,
            "total_cost": 510.00
          },
          "adjustments": [
            {
              "name": "New Customer Discount",
              "amount": 100.00
            }
          ]
        }
      }
    }
  }
  callSendAPI(messageData);
};

/*
* send booking preview
*/

// function sendcheckinMessage(recipientId) {
//   var messageData = {
//     "recipient": {
//       "id": recipientId
//     },
//     "message": {
//       "attachment": {
//         "type": "template",
//         "payload": {
//           "template_type": "airline_checkin",
//           "intro_message": "Booking Confirmation Message",
//           "locale": "en_US",
//           "pnr_number": "1001234",
//           "flight_info": [
//             {
//               "flight_number": "f001",
//               "departure_airport": {
//                 "airport_code": "SFO",
//                 "city": "San Francisco",
//                 "terminal": "T4",
//                 "gate": "G8"
//               },
//               "arrival_airport": {
//                 "airport_code": "SEA",
//                 "city": "Seattle",
//                 "terminal": "T4",
//                 "gate": "G8"
//               },
//               "flight_schedule": {
//                 "boarding_time": "2016-01-05T15:05",
//                 "departure_time": "2016-01-05T15:45",
//                 "arrival_time": "2016-01-05T17:30"
//               }
//             }
//           ],
//           "checkin_url": "https:\/\/www.airline.com\/check-in"
//         }
//       }
//   }
// }
// callSendAPI(messageData);
// };


/*
 * Send a Structured Message (Generic Message type) using the Send API.
 *
 */
function sendGenericMessage(recipientId, message, product) {
  var elements = [];
  console.log("in generic message");
  for (var i = 0; i < message.length; i++) {
    var element = {};
    element.title = message[i].name;
    element.subtitle = "Rating : " + message[i].rating;
    element.image_url = message[i].imageLink;
    // element.item_url=message[i].rating;
    var buttons = [];
    var button = {};
    button.type = "web_url";
    button.url = "https://www.zomato.com/bangalore/brundhavan-biriyani-house-rajarajeshwari-nagar";
    var speciality = _.findWhere(message[i].speciality, { item: product });
    button.title = product + " : " + speciality.rating + "/5";
    buttons.push(button);
    var button2 = {
      "type": "postback",
      "title": "Rate item",
      "payload": JSON.stringify({
        product: product,
        restaurant: message[i].name
      })
    };
    buttons.push(button2);
    element.buttons = buttons;
    elements.push(element);
  }

  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic", //from here
          elements: elements
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
* list of products 
*/
function sendListMessage(recipientId, message) {
  var elements = [];
  for (var i = 0; i < message.length; i++) {
    var element = {};
    element.title = message[i].name;
    element.subtitle = message[i].area;
    element.image_url = "http://www.pachd.com/free-images/food-images/korean-bbq-01.jpg";
    // var buttons = [];
    // var button = {};
    // button.type = "web_url";
    // button.url = "https://www.zomato.com/bangalore/brundhavan-biriyani-house-rajarajeshwari-nagar";
    // button.title = "Read more about item";
    // buttons.push(button);
    // element.buttons = buttons;
    elements.push(element);
    console.log("elements are", elements);
  }
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "list", //from here
          // elements: [
          //   {
          //     "title": "Classic T-Shirt Collection",
          //     "image_url": "https://peterssendreceiveapp.ngrok.io/img/collection.png",
          //     "subtitle": "See all our colors"
          //   },
          //   {
          //     "title": "Classic T-Shirt Collection",
          //     "image_url": "https://peterssendreceiveapp.ngrok.io/img/collection.png",
          //     "subtitle": "See all our colors"
          //   },
          //   ]
          elements: elements
        }
      }
    }
  };

  callSendAPI(messageData);
}
/*
 * Send a receipt message using the Send API.
 *
 */
function sendReceiptMessage(recipientId) {
  // Generate a random receipt ID as the API requires a unique ID
  var receiptId = "order" + Math.floor(Math.random() * 1000);

  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "receipt",
          recipient_name: "Peter Chang",
          order_number: receiptId,
          currency: "USD",
          payment_method: "Visa 1234",
          timestamp: "1428444852",
          elements: [{
            title: "Oculus Rift",
            subtitle: "Includes: headset, sensor, remote",
            quantity: 1,
            price: 599.00,
            currency: "USD",
            image_url: Config.SERVER_URL + "/assets/riftsq.png"
          }, {
              title: "Samsung Gear VR",
              subtitle: "Frost White",
              quantity: 1,
              price: 99.99,
              currency: "USD",
              image_url: Config.SERVER_URL + "/assets/gearvrsq.png"
            }],
          address: {
            street_1: "1 Hacker Way",
            street_2: "",
            city: "Menlo Park",
            postal_code: "94025",
            state: "CA",
            country: "US"
          },
          summary: {
            subtotal: 698.99,
            shipping_cost: 20.00,
            total_tax: 57.67,
            total_cost: 626.66
          },
          adjustments: [{
            name: "New Customer Discount",
            amount: -50
          }, {
              name: "$100 Off Coupon",
              amount: -100
            }]
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a message with Quick Reply buttons.
 *
 */
function sendQuickReply(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "What's your favorite movie genre?",
      quick_replies: [
        {
          "content_type": "text",
          "title": "Action",
          "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type": "text",
          "title": "Comedy",
          "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        },
        {
          "content_type": "text",
          "title": "Drama",
          "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a read receipt to indicate the message has been read
 *
 */
function sendReadReceipt(recipientId) {
  console.log("Sending a read receipt to mark message as seen");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "mark_seen"
  };

  callSendAPI(messageData);
}

/*
 * Turn typing indicator on
 *
 */
function sendTypingOn(recipientId) {
  console.log("Turning typing indicator on");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "typing_on"
  };

  callSendAPI(messageData);
}

/*
 * Turn typing indicator off
 *
 */
function sendTypingOff(recipientId) {
  console.log("Turning typing indicator off");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "typing_off"
  };

  callSendAPI(messageData);
}

/*
 * Send a message with the account linking call-to-action
 *
 */
function sendAccountLinking(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Welcome. Link your account.",
          buttons: [{
            type: "account_link",
            url: Config.SERVER_URL + "/authorize"
          }]
        }
      }
    }
  };

  callSendAPI(messageData);
}



/*
 * Call the Send API. The message data goes in the body. If successful, we'll 
 * get the message id in a response 
 *
 */
function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: Config.FB_PAGE_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    console.log("body is", body);
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      if (messageId) {
        console.log("Successfully sent message with id %s to recipient %s",
          messageId, recipientId);
      } else {
        console.log("Successfully called Send API for recipient %s",
          recipientId);
      }
    } else {
      console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
    }
  });
}

const fbMessage = (recipientId, msg, cb) => {
  const opts = {
    form: {
      recipient: {
        id: recipientId,
      },
      message: {
        text: msg,
      },
    },
  };

  fbReq(opts, (err, resp, data) => {
    if (cb) {
      cb(err || data.error && data.error.message, data);
    }
  });
};

const fbReq = request.defaults({
  uri: 'https://graph.facebook.com/me/messages',
  method: 'POST',
  json: true,
  qs: {
    access_token: Config.FB_PAGE_TOKEN
  },
  headers: {
    'Content-Type': 'application/json'
  },
});


module.exports = {
  sendImageMessage: sendImageMessage,
  sendGifMessage: sendGifMessage,
  sendAudioMessage: sendAudioMessage,
  sendVideoMessage: sendVideoMessage,
  sendFileMessage: sendFileMessage,
  sendListMessage: sendListMessage,
  sendTextMessage: sendTextMessage,
  sendButtonMessage: sendButtonMessage,
  sendPayMessage: sendPayMessage,
  sendGenericMessage: sendGenericMessage,
  sendReceiptMessage: sendReceiptMessage,
  sendQuickReply: sendQuickReply,
  sendReadReceipt: sendReadReceipt,
  // sendcheckinMessage:sendcheckinMessage,
  sendTypingOn: sendTypingOn,
  sendTypingOff: sendTypingOff,
  sendAccountLinking: sendAccountLinking,
  callSendAPI: callSendAPI,
  fbMessage: fbMessage,
  fbReq: fbReq
};