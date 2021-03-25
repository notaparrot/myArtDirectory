import './body.html';
import './artSquare.js';

import {
  Meteor
} from 'meteor/meteor';

import {
  Template
} from 'meteor/templating';

import {
  Tags
} from '../api/tags.js';

import {
  ArtSquares
} from '../api/artSquares.js';

import { ReactiveVar } from 'meteor/reactive-var';
import Images from '../api/images.js';


Template.body.helpers({
  tags() {
    return Tags.find({});
  },

  artSquares() {
    return ArtSquares.find({});
  },

});

//store tags to be published in an artSquare
let tagList = new Array(0);

Template.body.events({
  'submit .new-artSquare' : function (event) {

    // Prevent default browser form submit
    event.preventDefault();
    
    // Get value from form element
    const target = event.target;
    const title = target.title.value;
    const url = target.url.value;
    
    // Insert Image in database
    if (target.fileInput.files && target.fileInput.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      var file = target.fileInput.files[0];
      // console.log("file : ", file.name);
      if (file) {
        var uploadInstance = Images.insert({
          file: file,
          chunkSize: 'dynamic'
        }, false);

        // uploadInstance.on('start', function() {
          //   upTemplate.currentUpload.set(this);
          // });
          
          // uploadInstance.on('end', function(){
          //   upTemplate.currentUpload.set(false);
          // });
          
          uploadInstance.start();
          
          //clean file input field
          document.getElementById("fileInput").value = "";
          
        }
      }
      
      // const for db.artSquares formatting
      const image = file.name;
      
      // Insert content in ArtSquare db
      ArtSquares.insert({
        title,
        url,
        tagList,
        image,
      });
      Template
      Meteor.call('pushTags', tagList);
  
      // Clear form
      target.title.value = '';
      target.url.value = '';
      //clean taglist
      tagList = [];
      document.getElementById("display-tag").innerHTML = "";
      
  },

  'submit .tagToArray'(event) {

    event.preventDefault();

    tagList[tagList.length] = document.getElementById("tagInput").value;

    const target = event.target;
    var node = document.createElement("p");
    var textNode = document.createTextNode(target.tagInput.value);
    node.appendChild(textNode);
    document.getElementById("display-tag").appendChild(node);

    // Clear form
    target.tagInput.value = '';
  },

})

/////////////////////Images code ;////////////////

// Template.uploadedFiles.helpers({
//   uploadedFiles: function () {
//     return Images.find();
//   }
// });

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});