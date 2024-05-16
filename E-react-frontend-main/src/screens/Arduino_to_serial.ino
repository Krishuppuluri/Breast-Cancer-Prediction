#include <SoftwareSerial.h>

/* Strain gauge */
#define SENSOR_PIN01 A0
/* pressure sensor */
#define SENSOR_PIN05 A5
/* RX, TX pins for software serial communication */
SoftwareSerial BTSerial(2, 3);
unsigned long startTime;

void setup()
{
  Serial.begin(9600);
  BTSerial.begin(9600);
  pinMode(12,OUTPUT);
  Serial.print("time,pin01,pin05,Status");
  startTime = millis();
}
 
/* Main loop */
void loop()
{  
  pin01 = analogRead(SENSOR_PIN01);
  pin05 = analogRead(SENSOR_PIN05);
  Serial.print("Sensor_A0: ");
  Serial.println(pin01);
  Serial.print("Sensor_A5: ");
  Serial.println(pin05);
  if (pin01 > 50){
   digitalWrite(12, HIGH); // Turn on the LED if the sensor value is greater than 50
   Serial.println(str(startTime-millis()) + "," + str(pin01) + "," + str(pin05) + ",HIGH");
  } else {
    digitalWrite(12, LOW); // Turn off the LED if the sensor value is less than or equal to 50
    Serial.println(str(startTime-millis()) + "," + str(pin01) + "," + str(pin05) + ",LOW");
  }
  /*we don't need to read from the bluetooth device just have to send
  if (BTSerial.available()) { // Check if data is available to read from Bluetooth
    char receivedChar = BTSerial.read(); // Read the incoming data from Bluetooth
    Serial.println(receivedChar); // Print the received data to the serial monitor
    // Add your desired actions based on received data from Bluetooth
  }
  */
  if (Serial.available() && BTSerial.available()) { // Check if data is available to read from the serial monitor and check if
    char sendChar = Serial.read(); // Read the incoming data from the serial monitor
    BTSerial.write(sendChar); // Send the received data to the Bluetooth module
    // You can add other functionalities or data processing here
  }
  /* Wait 1 second and then read again */
  delay(1000);
}
