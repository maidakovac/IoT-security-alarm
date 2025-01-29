# IoT-security-alarm
# SafeAndSound

SafeAndSound is a motion detection and alarm system built using NodeMCU ESP8266, Firebase, and various sensors. The system detects motion and triggers an alarm while sending real-time updates to Firebase for remote monitoring.

## Features
- Motion detection using an analog motion sensor.
- Alarm activation through a buzzer.
- Real-time data synchronization with Firebase.
- Wi-Fi connectivity for remote monitoring.

## Components Used
- **NodeMCU ESP8266 Lolin V3** – Microcontroller for processing and Wi-Fi communication.
- **Analog Motion Sensor** – Detects movement and sends signals to the microcontroller.
- **Buzzer** – Alerts when motion is detected.
- **Firebase** – Cloud-based database for real-time updates.
- **Breadboard MB-102 & Jumper Wires** – For circuit connections.

## Circuit Connections
- **Motion Sensor**:
  - Signal Pin → A0 on NodeMCU
  - VCC → 3.3V on NodeMCU
  - GND → GND on NodeMCU
- **Buzzer**:
  - Positive Terminal → D7 on NodeMCU
  - Negative Terminal → GND on NodeMCU

## Setup Instructions
1. **Install Required Libraries**:
   - `ESP8266WiFi.h`
   - `FirebaseESP8266.h`
2. **Configure Firebase**:
   - Create a Firebase project.
   - Set up a Realtime Database.
   - Obtain the API key and database URL.
3. **Upload Code**:
   - Use Arduino IDE.
   - Set baud rate to 9600.
4. **Power the System**:
   - Connect NodeMCU via USB or external power supply.
   - Monitor motion detection and alarm activation.

## Usage
- The system continuously monitors motion and updates Firebase.
- If motion is detected, the buzzer is triggered.
- Data can be accessed remotely via Firebase.

## Future Improvements
- Mobile app integration for notifications.
- Additional sensors for enhanced detection.
- Battery-powered operation for portability.





