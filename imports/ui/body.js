import { Template } from 'meteor/templating';


import './body.html';

import { Tags } from '../api/tags.js';
import { ArtSquares } from '../api/artSquares.js';

 

Template.body.helpers({
    tags() {
        return Tags.find({});
      },

    artSquares() {
        return ArtSquares.find({});
    },
  
  });

