import {
  Template
} from 'meteor/templating';


import './body.html';
import './artSquare.js';

import {
  Tags
} from '../api/tags.js';
import {
  ArtSquares
} from '../api/artSquares.js';



Template.body.helpers({
  tags() {
    return Tags.find({});
  },

  artSquares() {
    return ArtSquares.find({});
  },

});

// Array to store the temporarily the tags before "new-artSquare get published"
// is it the best place to declare the value ?
let tagList = new Array(0);

Template.body.events({
  'submit .new-artSquare'(event) {

    // Prevent default browser form submit
    event.preventDefault();
    // Get value from form element
    const target = event.target;
    const title = target.title.value;
    const url = target.url.value;
    // Insert a task into the collection
    ArtSquares.insert({
      title,
      url,
    });
    // Clear form
    target.title.value = '';
    target.url.value = '';

  },
  
  'submit .tagToArray'(event) {

    event.preventDefault();

    tagList[tagList.length] = document.getElementById("tagInput").value;

    const target = event.target;
    var node = document.createElement("p");
    var textNode = document.createTextNode(target.tagInput.value);
    node.appendChild(textNode);
    document.getElementById("display-tag").appendChild(node);

    console.log(tagList);
    // Clear form
    target.tagInput.value = '';
  },
})