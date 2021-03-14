import {
  Template
} from 'meteor/templating';


import './body.html';

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
    target.text.value = '';

  },
  
  'submit .tagToArray'(event) {

    event.preventDefault();

    console.log("yep");


    tagList[tagList.length] = document.getElementById("tag-input").value;

    console.log(tagList);
  }
})