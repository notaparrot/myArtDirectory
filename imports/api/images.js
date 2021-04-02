import {
  Meteor
} from 'meteor/meteor';
import {
  FilesCollection
} from 'meteor/ostrio:files';

const Images = new FilesCollection({
  // temp files are deleted when the server is reset. need to set a specific folder to store images. following doesnt work because of writing permissions.
  //storagePath: '/data',

  debug: true,
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024 * 1024 * 10 && /png|jpe?g/i.test(file.extension)) {
      return true;
    }
    return 'Please upload image, with size equal or less than 10MB';
  }
});

if (Meteor.isServer) {

  Images.denyClient();
  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });
} else {
  Meteor.subscribe('files.images.all');
}

export default Images;