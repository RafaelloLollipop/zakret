package com.AGHacks.funPad;

import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.content.Context;

import java.net.Socket;

import java.io.BufferedWriter;
import java.io.OutputStreamWriter;

import com.AGHacks.funPad.R;


//import com.example.aaa.WebSocket;

public class MainActivity extends ActionBarActivity implements SensorEventListener {
		
	//private TextView sensorX;//, sensorY, sensorZ; Pola tekstowe
	private Sensor accelerometer; //Nie wiem
	private SensorManager sensorManager; //Nie wiem
	private Float Max; //Maksymalne przyspieszenie (g)
	private String dstAddress;
	private int dstPort;
	private String nick;
	private long czas;
	private long delay;
	private boolean graj;
	private boolean fire;
	
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {//Na poczatku
		super.onCreate(savedInstanceState);
		setContentView(R.layout.settings);
		initializeViews();//inicjalizacja zmiennych
			//connectWebSocket();
		sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
		
		if (sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER) != null) {//sprawdzam czy mam akcele.
			//sensorX.setText("akcelerometr");
		// success! we have an accelerometer
		
		accelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
		sensorManager.registerListener(this, accelerometer, SensorManager.SENSOR_DELAY_NORMAL);
		} else {

		}
		
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {//drugie 
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {//trzecie
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_settings) {
			graj = false;
			setContentView(R.layout.settings);
			((TextView) findViewById(R.id.name)).setText(nick);
			((TextView) findViewById(R.id.server)).setText(dstAddress);
			((TextView) findViewById(R.id.port)).setText(String.valueOf(dstPort));
			return true;
		}
		if (id == R.id.action_quit) {
			android.os.Process.killProcess(android.os.Process.myPid());
            System.exit(1);
		}
		return super.onOptionsItemSelected(item);
	}
	
	public void initializeViews() {
		fire = false;
		graj = false;
		Max = 9.81f;
		//sensorX = (TextView) findViewById(R.id.sensorX);
		dstAddress = "192.168.43.156";
		dstPort = 80;
		nick = "wolodija-test";
		czas = System.currentTimeMillis();
		delay = 50;
	}
	
	@Override
	public void onAccuracyChanged(Sensor sensor, int accuracy) {

	}
	
	@Override
	public void onSensorChanged(SensorEvent event) {//Wykonuje sie przy zmianie polozenia ;)
		/*sensorX.setText("x:" + Float.toString(event.values[0]/Max) +
		"\ny: " + Float.toString(event.values[1]/Max) +
		"\nz: " + Float.toString(event.values[2]/Max) +
		"\nmax" + Max);*/
		if(graj && System.currentTimeMillis() - czas > delay){
			sendPost("{\"type\":\"phone\", \"turnValue\":\"" + Float.toString(event.values[1]/Max) +"\", \"userName\":\"" + nick +"\", \"angles\":{\"x\":\"" + Float.toString(event.values[0]/Max) + "\",\"y\":\"" + Float.toString(event.values[1]/Max)
					+ "\", \"z\":\"" + Float.toString(event.values[2]/Max) + "\"}, \"fireButt\":\"" + fire + "\"}");
			czas = System.currentTimeMillis();
			((TextView) findViewById(R.id.sensorX)).setText(Float.toString(event.values[1]/Max));
			fire = false;
		}
		//sendMessage();
	}
	
	public void sendPost(String data){
		   try {
			    Socket socket = new Socket(dstAddress, dstPort);
			    String path = "/index.php";
			    BufferedWriter wr = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream(), "UTF8"));
			    wr.write("POST " + path + " HTTP/1.0\r\n");
			    wr.write("Content-Type: application/x-www-form-urlencoded\r\n");
			    wr.write("Host: www.example.com\r\n");
			    wr.write("Content-Length: " + data.length() + "\r\n");
			    wr.write("Connection: close\r\n");
			    wr.write("\r\n");

			    wr.write(data);
			    wr.flush();
			    wr.close();
			    socket.close();
			
		   }
		   catch (Exception e){
			   // sensorX.setText(e.toString());
			   
		   }
	}
	
	public void sendMessage( View view){
    	nick = ((TextView) findViewById(R.id.name)).getText().toString();
    	dstAddress = ((TextView) findViewById(R.id.server)).getText().toString();
    	dstPort = Integer.parseInt(((TextView) findViewById(R.id.port)).getText().toString());
    	if(nick != "" && dstAddress != "" && dstPort > 0){
			setContentView(R.layout.activity_main);
			graj = true;
    	}
	}
	
	public void fire(View view) {
		if(graj){
			fire = true;
		}
		
	}
	
}
