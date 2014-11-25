var Missile = Backbone.Model.extend({
        defaults : {
                pos_x   : null,
                pos_y   : null,
                isFired : false,
                vel_x   : null, 
                vel_y   : null
        },

        move : function(x,y){
                cur_x = this.get('pos_x');
                cur_y = this.get('pos_y');
                this.set({pos_x:(cur_x+x)%width, pos_y:(cur_y+y)%height});
                return [this.get('pos_x'), this.get('pos_y')]
        },
})


var Player = Backbone.Model.extend({
        defaults : {
                pos_x   : 100,
                pos_y   : 100,
                username: 'unknown',
                pause   : false,
                angle   : 0,
                turnValue: 0,

        },
        get_username : function ()
        {

                return this.get('username');
        },

        move : function(x,y){
                cur_x = this.get('pos_x');
                cur_y = this.get('pos_y');

                if(cur_x < -60){
                        cur_x = width;
                }
                if(cur_y < -10){
                        cur_y = height;
                        console.log(height);
                }

                this.set({pos_x:(cur_x+x)%width, pos_y:(cur_y+y)%height});
                return [this.get('pos_x'), this.get('pos_y')]
        },
 
        incrAngle : function(x){
                cur_angle = this.get('angle');
                this.set({angle:x});//(cur_angle*x)%360});
                return this.get('angle')
        },



        shoot : function(a){
                console.log("Shoot!" + a);
                missiles.push(new Missile({
                        pos_x:this.get('pos_x'),
                        pos_y:this.get('pos_y'),
                        isFired : true,
                        vel_x:Math.cos(2*Math.PI*this.get('angle')/360),
                        vel_y:Math.sin(2*Math.PI*this.get('angle')/360)}
                        ));
        }
});

