var PlayerView = Backbone.View.extend({
        model   : Player,
        tagName : "div",
        className: "player",
        template: _.template('<%= username%>'),
 
       
        initialize: function(){
                console.log("init");
                this.model.bind("change", this.render, this);
        },
       
        render: function(){
                var attr = this.model.toJSON();
                this.$el.prop('id', 'g'+this.model.get("username"));
        		this.$el.html(this.template(attr));
                this.$el.css({
                	'transform' : "rotate(" + (this.model.get('angle'))%360 + "deg)",
                    'position': 'absolute' ,
                    'left'    : this.model.get('pos_x'),
                    'top'     : this.model.get('pos_y')
                    });
                return this;
        }
});

var MissileView = Backbone.View.extend({
    model: Missile,
    tagName : "div",
    className: "missile",
    
    initialize: function(){
                console.log("init");
                this.model.bind("change", this.render, this);
        },

    render: function(){
                var attr = this.model.toJSON();
                this.$el.html(this.template(attr));
                this.$el.css({
                    'position': 'absolute' ,
                    'left'    : this.model.get('pos_x'),
                    'top'     : this.model.get('pos_y')
                    });
                return this;
        }
});

// var MissileListView = Backbone.View.extend({
//     collection : MissileList,
//     events     : {"change":"render"},
//     render     : function(){

//     }
// })