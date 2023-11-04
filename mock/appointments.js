const names = ["Lebron James", "Kevin Durant", "Stephen Curry", "Kawhi Leonard", "James Harden"];
const times = ["2:00", "3:00", "4:00", "5:00", "6:00"];
const locations = ["Ohio, Clinic", "California, Hospital", "Texas, Health Center", "New York, Clinic", "Florida, Hospital"];
const diseases = ["Diabetes", "Flu", "Cold", "Migraine", "Asthma"];
const services = ["Visit", "Consultation", "Check-up", "Emergency", "Follow-up"];

function getRandomEntry(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const dataColumns = ['Patient Name', 'Time', 'Location', 'Diseases', 'Services']

const dataArray = Array(50).fill().map(() => (
  {
    "name": getRandomEntry(names),
    "time": getRandomEntry(times),
    "location": getRandomEntry(locations),
    "disease": getRandomEntry(diseases),
    "service": getRandomEntry(services)
  }
));

export {dataArray, dataColumns}