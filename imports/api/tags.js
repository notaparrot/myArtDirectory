import {
    Mongo
} from 'meteor/mongo';



export const Tags = new Mongo.Collection('tags');


if (Meteor.isServer) {

    Meteor.methods({
        pushTags: function (arg) {

            for (let i = 0; i < arg.length; i++) {
                Tags.upsert(
                    //selector
                    {
                        text: arg[i]
                    },
                    //modifier
                    {
                        text: arg[i]
                    }
                );
                console.log(i);
            };
        }
    });
}