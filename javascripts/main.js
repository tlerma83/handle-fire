"use strict";
console.log("we are rolling");


let Handlebars = require('hbsfy/runtime'),
    cakeInventory = require('./bakery.js'),
    cakeTemplate = require('../templates/cake-grid.hbs'),
    eventStuff = require('./events.js'),
    welcomeTemplate = require('../templates/welcome.hbs'),
    welcomeData = require('../templates/welcome-data.js');

Handlebars.registerHelper("increment", (value) => parseInt(value) + 1);

$("#welcome").append(welcomeTemplate(welcomeData));


function populatePage(stuff) {
    let newDiv = document.createElement("div");
    newDiv.innerHTML = cakeTemplate(stuff);
    $("#cake-cards").append(newDiv);
    eventStuff();
}

cakeInventory.loadInventory()
.then(
    (inventoryFromLoadInventoryResolve) =>{
        console.log("cake promise", inventoryFromLoadInventoryResolve);
        populatePage(inventoryFromLoadInventoryResolve);
    },
    (reason) => {
        console.log("something went wrong");
    }
);
