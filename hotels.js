async function loadHotels() {
  const res = await fetch('http://localhost:5000/api/hotels');
  const hotels = await res.json();

  const list = document.getElementById('hotelList');
  list.innerHTML = '';

  hotels.forEach((h) => {
    const li = document.createElement('li');
    li.textContent = `${h.name} (${h.city})`;
    li.dataset.id = h._id;

    // on click go to booking page, passing hotelId + roomIndex=0
    li.addEventListener('click', () => {
      window.location.href = `booking.html?hotelId=${h._id}&roomIndex=0`;
    });

    list.appendChild(li);
  });
}

loadHotels();
