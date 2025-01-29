const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-database-url.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const motionSensorRef = db.ref('motionSensor');

const sensorValueElem = document.getElementById('sensorValue');
const alarmStatusElem = document.getElementById('alarmStatus');
const stopAlarmBtn = document.getElementById('stopAlarmBtn');
const securityLevelElem = document.getElementById('securityLevel');
const alarmImageElem = document.getElementById('alarmImage');
const activityAlarmBtn = document.getElementById('activityAlarmBtn');

let alarmDeactivated = false;

const getGaugeColor = value => value >= 870 ? '#4caf50' : value >= 500 ? '#ff9800' : '#f44336';
const getSecurityLevel = value => value >= 870 ? 'High' : value >= 500 ? 'Medium' : 'Low';

const ctx = document.getElementById('gaugeChart').getContext('2d');
const gaugeChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [0, 1030],
      backgroundColor: ['#4caf50', '#e0e0e0'],
      borderWidth: 0,
      cutout: '80%',
      rotation: 270,
      circumference: 180
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  }
});

const updateUI = (sensorValue, alarmStatus) => {
  sensorValueElem.innerText = `Motion sensor value: ${sensorValue}`;
  alarmStatusElem.innerText = `Alarm status: ${alarmStatus ? 'ON' : 'OFF'}`;
  alarmImageElem.src = alarmStatus ? 'alarm.png' : 'alert.png';
  stopAlarmBtn.style.display = alarmStatus ? 'inline-block' : 'none';

  const gaugeColor = getGaugeColor(sensorValue);
  gaugeChart.data.datasets[0].backgroundColor = [gaugeColor, '#e0e0e0'];
  gaugeChart.data.datasets[0].data = [sensorValue, 1030 - sensorValue];
  gaugeChart.update();

  securityLevelElem.innerText = `Security Level: ${getSecurityLevel(sensorValue)}`;
};

motionSensorRef.on('value', (snapshot) => {
  const data = snapshot.val() || {};
  const sensorValue = data.value || 0;
  let alarmStatus = data.alarm || false;

  if (alarmDeactivated) {
    alarmStatus = false;
  }

  updateUI(sensorValue, alarmStatus);
});

stopAlarmBtn.addEventListener('click', () => {
  motionSensorRef.update({ alarm: false });
  alert('Alarm turned off!');
});

activityAlarmBtn.addEventListener('click', () => {
  alarmDeactivated = !alarmDeactivated;
  activityAlarmBtn.innerText = alarmDeactivated ? 'Activate' : 'Deactivate';
  document.getElementById('activityStatus').innerText = alarmDeactivated ? 'Inactive' : 'Active';
  document.getElementById('activityImage').src = alarmDeactivated ? 'inactive.png' : 'active.png';
});

let sensorDeactivated = false;

activityAlarmBtn.addEventListener('click', () => {
  sensorDeactivated = !sensorDeactivated;

  motionSensorRef.update({
    alarmDeactivated: sensorDeactivated,
    sensorDeactivated: sensorDeactivated
  });

  activityAlarmBtn.innerText = sensorDeactivated ? 'Activate' : 'Deactivate';
  document.getElementById('activityStatus').innerText = sensorDeactivated ? 'Inactive' : 'Active';
  document.getElementById('activityImage').src = sensorDeactivated ? 'inactive.png' : 'active.png';
});
