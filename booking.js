// read parameters from URL: ?hotelId=...&roomIndex=...
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

const hotelId = getParam('hotelId');
const roomIndex = Number(getParam('roomIndex') || 0);

const form = document.getElementById('bookingForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login first');
    window.location.href = 'login.html';
    return;
  }

  const body = {
    hotelId,
    roomIndex,
    checkIn: document.getElementById('checkIn').value,
    checkOut: document.getElementById('checkOut').value,
    guests: Number(document.getElementById('guests').value)
  };

  const res = await fetch('http://localhost:5000/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  if (!res.ok) {
    alert(data.message || 'Booking failed');
    return;
  }

  alert('Booking created: ' + data._id);
});
