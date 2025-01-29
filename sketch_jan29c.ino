#include <Arduino.h>
#if defined(ESP32)
  #include <WiFi.h>
#elif defined(ESP8266)
  #include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>

#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

#define WIFI_SSID "your-ssid"
#define WIFI_PASSWORD "your-password"

#define API_KEY "your-api-key"
#define DATABASE_URL "https://your-database-url.firebaseio.com/"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
unsigned long sensorPrevMillis = 0;
bool signupOK = false;

const int motionSensorPin = A0;
const int buzzerPin = D7;

bool buzzerStatus = false;
bool alarmDeactivated = false;
bool sensorDeactivated = false;

void setup() {
  Serial.begin(9600);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(300);
  }

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  if (Firebase.signUp(&config, &auth, "", "")) {
    signupOK = true;
  }

  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  unsigned long currentMillis = millis();

  if (Firebase.RTDB.getBool(&fbdo, "motionSensor/alarmDeactivated")) {
    if (fbdo.dataType() == "boolean") {
      alarmDeactivated = fbdo.boolData();
    }
  }

  if (Firebase.RTDB.getBool(&fbdo, "motionSensor/sensorDeactivated")) {
    if (fbdo.dataType() == "boolean") {
      sensorDeactivated = fbdo.boolData();
    }
  }

  if (sensorDeactivated) {
    noTone(buzzerPin);
    buzzerStatus = false;
    return;
  }

  if (currentMillis - sensorPrevMillis >= 500) {
    sensorPrevMillis = currentMillis;
    int motionValue = analogRead(motionSensorPin);

    if (motionValue < 870 && !buzzerStatus && !alarmDeactivated) {
      tone(buzzerPin, 300);
      buzzerStatus = true;
      Firebase.RTDB.setBool(&fbdo, "motionSensor/alarm", true);
    }
  }

  if (Firebase.RTDB.getBool(&fbdo, "motionSensor/alarm")) {
    if (fbdo.dataType() == "boolean" && !fbdo.boolData()) {
      noTone(buzzerPin);
      buzzerStatus = false;
    }
  }

  if (!sensorDeactivated && Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 1000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();
    Firebase.RTDB.setInt(&fbdo, "motionSensor/value", analogRead(motionSensorPin));
  }
}
