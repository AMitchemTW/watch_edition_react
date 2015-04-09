'use strict';

var $ = require('jquery'),
  _ = require('underscore'),
  Backbone = require('backbone');

var ContactsCollection = require('../collections/contacts'),
  ContactView = require('./contact');

var ContactsView = Backbone.View.extend({

    el: $('#watch-face'),

    template: require('../../templates/views/contacts.hbs'),

    initialize: function(){
      _.bindAll(this, 'render', 'appendItem');

      this.collection = new ContactsCollection();

      this.collection.add([
        {name: 'Adam'},
        {name: 'Sam'},
        {name: 'Shaheedha'}
      ]);

      this.render();
    },

    render: function(){
      var self = this;
      this.$el.html(this.template());
      _.each(this.collection.models, function (contact){
        self.appendItem(contact);
      }, this);
    },

    appendItem: function(contact){
      var contactView = new ContactView({
        model: contact
      });
      $('ul', this.el).append(contactView.render().el);
    }

  }
);

module.exports = ContactsView;