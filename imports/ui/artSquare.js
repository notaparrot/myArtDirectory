import {
  Template
} from 'meteor/templating';

import {
  ArtSquares
} from '../api/artSquares.js';

import './artSquare.html';

import Images from '../api/images.js';

Template.artSquare.events({

  'click .delete'() {

    ArtSquares.remove(this._id);
    //following doesnt work
    Images.remove(this._id);
  },

});

Template.file.helpers({
  imageFile() {
    //return match of the name of file in artSquares and Images collection
    return Images.findOne({
      'name': this.image
    });
  }
})


//console print getElementById is null but code still works ?!
function ScrollDiv() {
  if (document.getElementById('tag-in-square-div').scrollLeft < (document.getElementById('tag-in-square-div').scrollWidth - document.getElementById('tag-in-square-div').offsetWidth)) {
    -1
    document.getElementById('tag-in-square-div').scrollLeft = document.getElementById('tag-in-square-div').scrollLeft + 1
  } else {
    document.getElementById('tag-in-square-div').scrollLeft = 0;
  }
}
setInterval(ScrollDiv, 50);