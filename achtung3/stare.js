/*


// Example view implementation
var ExampleView = Backbone.View.extend({
  // bind events outside of the view in initialize
  initialize: function() {
    // bind all methods to `this` scope
    _.bindAll(this);
    $(document).on('keydown', this.keydown);
    $(document).on('keyup', this.keyup);
  },
  keydown: function(event) {
    console.log('keydown');
  },
  keyup: function(event) {
    console.log('keyup');
  },
  render: function() {
    this.el.innerHTML = 'example view';
    return this;
  },
  // override remove to also unbind events
  remove: function() {
    $(document).off('keydown', this.keydown);
    $(document).off('keyup', this.keyup);
    Backbone.View.prototype.remove.call(this);
  }
});
 
// Initialise the view
var view = new ExampleView({ id: 'example' });
document.body.appendChild(view.render().el);
 

 ----

*/

 var width = $(window).width();
var height = $(window).height();


var Player = Backbone.Model.extend({
  rootUrl: "/players"
});

var PlayerView = Backbone.View.extend({
  el:'body',
  tagName:'div',
  model:Player,
  template:_.template('<div class=player id=g<%= div_id %> ></div>'),

  initialize: function(){
    this.render();
  },

  render: function(){
    var attr = this.model.toJSON();
    this.$el.append(this.template(attr));
    return this;
  }
  
});

var player1 = new Player();
player1.set("div_id","1");
var playerView = new PlayerView({model:player1});

var player2 = new Player();
player2.set("div_id","2");
var playerView2 = new PlayerView({model:player2});

var player3 = new Player();
player3.set("div_id","3");
var playerView3 = new PlayerView({model:player3});

var Players = Backbone.Collection.extend({model:Player});
var players = new Players();
var PlayersView = Backbone.View.extend({
  initialize: function(){
    this.collection.on("add", this.addOne, this);
    

  },

  render: function(){
    this.collection.forEach(this.addOne, this);
  },
  addOne: function(item){
    var v = new PlayerView({model : item});
    this.$el.append(playerView.render().el);
  }

});

var playersView = new PlayersView({collection : players});
players.collection.on("add", function(item){
  item.$el.css({'position': 'absolute' ,
          'left'            : Math.floor(Math.random()*(width-300)+150)+1,
              'top'             : Math.floor(Math.random()*(height-300)+150)+1

})});



players.add(player1);
players.add(player2);
players.add(player3);

