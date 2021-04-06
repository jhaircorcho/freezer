#include <ESP8266WiFi.h>
#include <WiFiClient.h> 
#include <FirebaseArduino.h>
#include <ArduinoJson.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

#define FIREBASE_HOST "freezer-280fc-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "2qbN3G7txljB6u3iQGX2UwSRM3ionLTN4yFyX10Q"
#define WIFI_SSID "ALCOR_INVITADOS"
#define WIFI_PASSWORD "$gecor1951"

float TempAmbiente_D1;
float TempFreezer_D2;
float TempRefrigerador_D3;
float TempCompresor_D4;
float VibCompresor_D5;
float Correinte_D6;
float Voltaje_D7;
float Humedad_D8;

int Pin_D1=5;
int Pin_D2=4;
int Pin_D3=0;
int Pin_D4=2;
int Pin_D5=14;


int Led_OnBoard = 2;                  // Initialize the Led_OnBoard 
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

void setup() {
  delay(1000);
  pinMode(Pin_D1,OUTPUT);
  pinMode(Pin_D2,OUTPUT);
  pinMode(Pin_D3,OUTPUT);
  pinMode(Led_OnBoard, OUTPUT);       // Initialize the Led_OnBoard pin as an output
  Serial.begin(115200);
  WiFi.mode(WIFI_OFF);        //Prevents reconnection issue (taking too long to connect)
  delay(1000);
  WiFi.mode(WIFI_STA);        //This line hides the viewing of ESP as wifi hotspot
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.println("");

  Serial.print("Connecting");
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(Led_OnBoard, LOW);
    delay(250);
    Serial.print(".");
    digitalWrite(Led_OnBoard, HIGH);
    delay(250);
  }

  digitalWrite(Led_OnBoard, HIGH);
  //If connection successful show IP address in serial monitor
  Serial.println("");
  Serial.println("Connected to Network/SSID");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //IP address assigned to your ESP
  timeClient.begin();
  timeClient.setTimeOffset(0);
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

}


void loop() {
   timeClient.update();

unsigned long epochTime = timeClient.getEpochTime();
//Get a time structure
  struct tm *ptm = gmtime ((time_t *)&epochTime); 
    int monthDay = ptm->tm_mday;
    int currentMonth = ptm->tm_mon+1;
    int currentYear = ptm->tm_year+1900;
    String formattedTime = timeClient.getFormattedTime();
    
     String currentDate = String(currentYear) + "-" + String(currentMonth) + "-" + String(monthDay)+ " " +formattedTime;
   
   digitalWrite(Pin_D1,HIGH);
   delay(500);
   TempAmbiente_D1=analogRead(A0);
   digitalWrite(Pin_D1,LOW);

   digitalWrite(Pin_D2,HIGH);
   delay(500);
   TempFreezer_D2=analogRead(A0);
   digitalWrite(Pin_D2,LOW);
    
   digitalWrite(Pin_D3,HIGH);
   delay(500);
   TempRefrigerador_D3=analogRead(A0);
   digitalWrite(Pin_D3,LOW);

   TempCompresor_D4 = TempAmbiente_D1*0.896;
   VibCompresor_D5 = TempFreezer_D2*2.651;
   Correinte_D6 = TempRefrigerador_D3*TempRefrigerador_D3*341;
   Voltaje_D7 =  TempFreezer_D2*3.154;
   Humedad_D8 =  TempAmbiente_D1/2.698;

  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["Fecha"] = currentDate;
  root["TempAmbiente"] = TempAmbiente_D1;
  root["TempFreezer"] = TempFreezer_D2;
  root["TempRefrigerador"] = TempFreezer_D2;
  root["TempCompresor"] = TempFreezer_D2;
  root["VibCompresor"] = TempFreezer_D2;
  root["Correinte"] = TempFreezer_D2;
  root["Voltaje"] = TempFreezer_D2;
  root["Humedad"] = TempFreezer_D2;
 
  Firebase.push("Equipo0451", root);

  // handle error
  if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());  
      return;
  }
  delay(1000000);
 


}
