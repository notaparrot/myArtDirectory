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
    return Images.findOne({'name': this.image});
  }
})