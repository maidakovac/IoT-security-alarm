# IoT-security-alarm

# SafeAndSound - Motion Detection & Alarm System

## Overview
SafeAndSound is a smart security system based on the NodeMCU ESP8266 Lolin V3, integrated with Firebase for real-time monitoring. The system utilizes a dual-channel IR motion sensor (Arduino RK1017), a sound sensor, and a buzzer to detect movement and sound disturbances. The motion sensor is connected to the analog pin (A0) on the NodeMCU, and Firebase is used to store and retrieve sensor data.

## Features
- **Real-time motion detection** using an IR motion sensor.
- **Alarm activation** when motion is detected below a threshold.
- **Buzzer alert system** to warn about unauthorized movement.
- **Remote control via Firebase** to deactivate alarms or disable the sensor.
- **Graphical user interface (GUI)** with a security level gauge and control buttons.
- **Cloud-based monitoring** using Firebase Realtime Database.

## Hardware Components
- **NodeMCU ESP8266 Lolin V3** - Microcontroller for processing and network communication.
- **PIR Motion Sensor (HC-SR505)** - Detects motion and sends signals to NodeMCU.
- **Arduino RK1017 (Dual IR Motion Sensor)** - Used for additional motion detection.
- **Sound Sensor** - Detects noise levels and triggers alerts.
- **Buzzer** - Provides an audible alarm when motion is detected.
- **Breadboard MB-102** - Used for wiring all components together.

## Circuit Connections
| Component       | NodeMCU Pin |
|----------------|------------|
| PIR Sensor     | D1         |
| Sound Sensor   | D2         |
| Buzzer (+)     | D7         |
| Buzzer (-)     | GND        |
| Motion Sensor  | A0         |

## Software & Technologies Used
- **Arduino IDE** for programming NodeMCU.
- **Firebase Realtime Database** for data storage and remote monitoring.
- **HTML, CSS, JavaScript** for web-based visualization.
- **Chart.js** for graphical representation of sensor data.

## Setup Instructions
### 1. Hardware Setup
1. Connect all components according to the wiring table.
2. Power the NodeMCU via USB or an external 3.3V power source.

### 2. Software Installation
1. Install **Arduino IDE** and add ESP8266 board support.
2. Install required libraries:
   - `Firebase_ESP_Client`
   - `ESP8266WiFi`
3. Open the provided **Arduino code** and update the WiFi credentials and Firebase API key.
4. Upload the code to NodeMCU.

### 3. Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Realtime Database** and set read/write permissions.
3. Copy the database URL and API key into the Arduino code.

### 4. Web Interface Setup
1. Upload the HTML, CSS, and JavaScript files to a hosting service or local server.
2. Open `index.html` in a browser.
3. Ensure Firebase database rules allow access to the web app.

## How It Works
1. When motion is detected, the sensor sends a signal to NodeMCU.
2. The NodeMCU processes the data and updates Firebase in real-time.
3. The web interface retrieves the data from Firebase and displays the current motion sensor value and security level.
4. If the motion value is below a threshold, the buzzer is activated and an alarm is triggered.
5. The user can deactivate the alarm or sensor remotely via the web interface.

## Usage
- **Monitor security status** from any device with internet access.
- **Control alarm system** remotely through the web interface.
- **Adjust security settings** via Firebase for different sensitivity levels.

## Future Improvements
- Integration with **push notifications** for real-time alerts.
- **Mobile app** for easier control.
- Additional **sensors** for sound and vibration detection.
- Cloud-based **data logging** for security analytics.

---
This project is designed to enhance home security using IoT technology, making it easy to monitor and react to unauthorized activities remotely.

