// How to connect your Telegram Bot to a Google Spreadsheet (Google Apps Script)
// https://www.youtube.com/watch?v=mKSXd_od4Lg
// 
// This code must be added to the Google Apps Script file attached to the spreadsheet script editor. 
// Full steps in the readme

var token = 'YOUR_token';     // 1. FILL IN YOUR OWN TOKEN
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = 'YOUR_webAppUrl'; // 2. FILL IN YOUR GOOGLE WEB APP ADDRESS
var ssId = 'YOUR_ssId';      // 3. FILL IN THE ID OF YOUR SPREADSHEET
var adminID = "";   // 4. Fill in your own Telegram ID for debugging
var sheetName = 'spendings'; //text.slice(1).split(" ")[0];
var sheet = SpreadsheetApp.openById(ssId).getSheetByName(sheetName);
      

function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}


function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function sendText(id,text) {
  var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + encodeURIComponent(text);
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function doGet(e) {
  // sheet.appendRow([new Date(),'doGet']);
  return HtmlService.createHtmlOutput("Hi there" + JSON.stringify(e));
}

function doPost(e) {
  // sheet.appendRow([new Date(),'doPost']);
  try {
    // this is where telegram works
    var data = JSON.parse(e.postData.contents);
    var text = data.message.text;
    var id = data.message.chat.id;
    var username = data.message.chat.username; //+ " " + data.message.chat.last_name;
    var name = data.message.chat.first_name + " " + data.message.chat.last_name;

    // var count_spend = text.split(" ")[0];
    var index = text.indexOf(" ");  // Gets the first index where a space occours
    var count_spend = text.substr(0, index); // Gets the first part
    var comments = text.substr(index + 1);  // Gets the text part

    // var answer = "Hi " ;
    // sendText(id, data);
    sheet.appendRow([new Date(), username, count_spend, comments, text, name]);
    sendText(id,"" + text + "' is now added to the sheet '" + sheetName + "'");
    
    // if(text == '') {
      
    //   var newText = text.split(" ").slice(1).join(" ")[0];
    //   sheet.appendRow([new Date(),name, text]);
    //   sendText(id,"your text '" + newText + "' is now added to the sheet '" + sheetName + "'");
    // }
  } catch(e) {
    sendText(ssId, JSON.stringify(e,null,4));
    //sheet.appendRow([new Date(),'error']);
  }
}
