import { Template } from 'meteor/templating';

import { ArtSquares } from '../api/artSquares.js';

import './artSquare.html';

//test import
import { imageFile } from './body.js';

Template.artSquare.events({

  'click .delete'() {

    ArtSquares.remove(this._id);

  },

});

