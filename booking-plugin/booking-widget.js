(function () {
    const API_BASE_URL = "http://localhost:5000"; // Update with your hosted API URL
  
    function loadCSS(url) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
    }
  
    function createBookingUI() {
      const container = document.createElement("div");
      container.id = "booking-widget";
      container.innerHTML = `
        <div class="booking-container">
          <h2>Book an Appointment</h2>
          <input type="date" id="booking-date" />
          <select id="booking-slot">
            <option value="">Select a time slot</option>
          </select>
          <input type="text" id="booking-name" placeholder="Your Name" />
          <input type="text" id="booking-phone" placeholder="Phone Number" />
          <button id="booking-submit">Book Appointment</button>
          <p id="booking-message"></p>
        </div>
      `;
      document.body.appendChild(container);
      addEventListeners();
    }
  
    function addEventListeners() {
      document.getElementById("booking-date").addEventListener("change", fetchAvailableSlots);
      document.getElementById("booking-submit").addEventListener("click", bookAppointment);
    }
  
    function fetchAvailableSlots() {
      const date = document.getElementById("booking-date").value;
      if (!date) return;
  
      fetch(`${API_BASE_URL}/slots?date=${date}`)
        .then(response => response.json())
        .then(data => {
          const slotSelect = document.getElementById("booking-slot");
          slotSelect.innerHTML = '<option value="">Select a time slot</option>';
          data.availableSlots.forEach(slot => {
            const option = document.createElement("option");
            option.value = slot;
            option.textContent = slot;
            slotSelect.appendChild(option);
          });
        });
    }
  
    function bookAppointment() {
      const name = document.getElementById("booking-name").value;
      const phone = document.getElementById("booking-phone").value;
      const date = document.getElementById("booking-date").value;
      const timeSlot = document.getElementById("booking-slot").value;
      const message = document.getElementById("booking-message");
  
      if (!name || !phone || !date || !timeSlot) {
        message.textContent = "All fields are required";
        return;
      }
  
      fetch(`${API_BASE_URL}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, date, timeSlot })
      })
        .then(response => response.json())
        .then(data => {
          message.textContent = data.message || "Appointment booked successfully!";
        })
        .catch(() => {
          message.textContent = "Booking failed";
        });
    }
  
    // Load CSS (optional, replace with hosted CSS file if needed)
    loadCSS("https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css");
    createBookingUI();
  })();
  