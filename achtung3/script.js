


var playerOdbierz = {
	dane : ""
};

// Player 1 
/*addPlayer(new Player({
        id:1,
        username:'Antek',
        pos_x: Math.floor(Math.random()*(width-300)+150)+1,
        pos_y: Math.floor(Math.random()*(height-300)+150)+1,
        angle: 0
        }), new PlayerView({
        model: player1
		})
    })*/
// var player1 = new Player({
//         id:1,
//         username:'Antek',
//         pos_x: Math.floor(Math.random()*(width-300)+150)+1,
//         pos_y: Math.floor(Math.random()*(height-300)+150)+1,
//         angle: 0
//         });
 
// View of Player 1
// var playerView1 = new PlayerView({
//         model: player1
// });
/* 
// Player 2
var player2 = new Player({
        id: 2,
        username: 'Maks',
        pos_x: Math.floor(Math.random()*(width-300)+150)+1,
        pos_y: Math.floor(Math.random()*(height-300)+150)+1,
        angle: 0
        });
 
// View of Player 2
var playerView2 = new PlayerView({
        model: player2
});*/

// -----------------------------------------
// Key handlers - used to debug
var angleKeyPress1 = 0;
var angleKeyPress2 = 0;
var promien = 20;
var gameOver=[];

$("body").keydown(function(e) {
	  if (e.which === 37){
	  		angleKeyPress1 = -0.1;
	  }

	  else if (e.which === 39){
	  		angleKeyPress1 = 0.1;
	  }

	  else if (e.which === 65){
	  		angleKeyPress2 = -0.1;
	  }

	  else if (e.which === 83){
	  		angleKeyPress2 = 0.1;
	  }

	  

      if (angleKeyPress1 >0.5){
	  	angleKeyPress1 = 0.5;
	  }
	  else if (angleKeyPress1 <-0.5){
	  	angleKeyPress1 = -0.5;
	  }

	  if (angleKeyPress2 >0.5){
	  	angleKeyPress2 = 0.5;
	  }
	  else if (angleKeyPress2 <-0.5){
	  	angleKeyPress2 = -0.5;
	  }


	  if (e.which === 86){
	  		player1.shoot();
	  }

	  if (e.which === 77){
	  		player2.shoot();
	  }

});

$("body").keyup(function(e) {
	  if (e.which === 37 || e.which === 39){
	  		angleKeyPress1 = 0;
	  }

	  else if (e.which === 65 || e.which === 83){
	  		angleKeyPress2 = 0;
	  }
	  else if (e.which === 78){
	  		bonus=16;
	  }

});

var pos = [];
function fun(player, incr){   

		if(gameOver.indexOf(player.get_username() )<0){
			
		var anglerad = 2*Math.PI*(player.get('angle') + player.get('turnValue'))/360;  
		// player.move(
  //               bonus*Math.cos(anglerad),
  //               bonus*Math.sin(anglerad)
  //       );    
        pos.unshift(player.move(
                bonus*Math.cos(anglerad),
                bonus*Math.sin(anglerad)
        ));
        if (pos.length > 100){
        	pos = pos.slice(0,99);
        };
        player.incrAngle((player.get('angle') + player.get('turnValue'))%360)
    }
};

var dt = 10;

function checkZderz(jeden, dwa)
{

		jeden_x=jeden.model.get('pos_x')
		dwa_x=dwa.model.get('pos_x')
		jeden_y=jeden.model.get('pos_y')
		dwa_y=dwa.model.get('pos_y')
		odl = Math.sqrt(Math.pow((jeden_x-dwa_x),2) + Math.pow((jeden_y-dwa_y),2));
		
		if (odl < 2* promien)
		{
		
			console.log("BOOM")
			gameOver.push(jeden.model.get_username());
			gameOver.push(dwa.model.get_username());
		}
}

function nieWiem(){
	for(i=0; i<players.length; i++){
		fun(players[i].model, Math.round(players[i].model.get('turnValue')))
				
				if((gameOver.indexOf(players[i].model.get_username())) < 0 && players.length>1 )
				{

					for (j=i+1; j < players.length; j++)
					{
						
					if(gameOver.indexOf(players[j].model.get_username()) < 0)
						{
							
							checkZderz(players[i],players[j]);
						}
					}
				}
	}
	// try
	// {
	// 	fun(
	// 		player1, 
	// 		Math.round(100*playerOdbierz['dane'][0]['turnValue'])/1000);
	// 	console.log(playerOdbierz['dane'][0]['turnValue']);
	// }
	// catch(err)
	// {
	// 	fun(player1, 0)
	// } 
	// fun(player2, angleKeyPress2);

	setTimeout(function(){nieWiem();}, dt);
};

$(function (){
	// for(i=0; i< players.length; i++){
        // $('div#area').append(players[i].view.render().el);
	// }
nieWiem();
    //    var intervalId = window.setInterval("fun(player1, playerOdbierz['dane'][0]['turnValue']/2); fun(player2,angleKeyPress2)")
      // var intervalId = window.setInterval("try{fun(player1, Math.round(5*Math.exp(8*playerOdbierz['dane'][0]['turnValue'])/1000)}catch(err){fun(player1, 0)}; fun(player2, angleKeyPress2); console.log(Math.round(100*playerOdbierz['dane'][0]['turnValue'])/400); if (playerOdbierz['dane'][0]['fireButt'] === true) {console.log('fire:' + playerOdbierz['dane'][0]['fireButt'])}", dt);
 /*       setInterval(function(playerOdbierz){return function(){
      var intervalId = window.setInterval("try{fun(player1, (1/40)*exp(8*Math.round(100*playerOdbierz['dane'][0]['turnValue'])/500))}catch(err){fun(player1, 0)}; fun(player2, angleKeyPress2); console.log(Math.round(100*playerOdbierz['dane'][0]['turnValue'])/400); if (playerOdbierz['dane'][0]['fireButt'] === true) {console.log('fire:' + playerOdbierz['dane'][0]['fireButt'])}", dt);

        	console.log(playerOdbierz)
        	try{
        	var tempAngle1 = playerOdbierz['dane'][0]['typeurnValue'];
        	}
        	catch(err)
        	{tempAngle1 = 0; };
        	fun(player1, tempAngle1);
        	console.log(tempAngle1)
        	fun(player2, angleKeyPress2);
        }}(playerOdbierz), dt)

var intervalId = window.setInterval(function(){
        	tempAngle1 = 0;
        	try{
        	var tempAngle1 = playerOdbierz['dane'][0]['typeurnValue'];
        	}
        	catch(exception e)
        	{ }	
        	fun(player1, tempAngle1);
        	console.log(tempAngle1)
        	fun(player2, angleKeyPress2);
        	console.log(playerOdbierz['dane'][0]['typeurnValue'])
        }
        	, dt);

*/




});
//console.log(player1.data);