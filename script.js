document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel-image');
    const captions = document.querySelectorAll('.carousel-caption');
    let currentIndex = 0;
    const totalImages = images.length;
    let hoverInterval;

    // Function to update the carousel
    function updateCarousel() {
        const translateXValue = -(currentIndex * 100);
        carousel.style.transform = `translateX(${translateXValue}%)`;

        captions.forEach((caption, index) => {
            caption.style.opacity = index === currentIndex ? '1' : '0';
            caption.style.visibility = index === currentIndex ? 'visible' : 'hidden';
        });
    }

    // Start cycling images on hover with a longer interval
    function startHoverCycle() {
        hoverInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        }, 3000); // Change every 3 seconds (adjust the time as needed)
    }

    // Stop cycling images when hover ends
    function stopHoverCycle() {
        clearInterval(hoverInterval);
    }

    // Event listeners
    carousel.addEventListener('mouseenter', startHoverCycle);
    carousel.addEventListener('mouseleave', stopHoverCycle);

    // Initialize carousel
    updateCarousel();
});

// Function to toggle the registration and login forms
function toggleForm(formId) {
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => form.classList.add('hidden'));

    const activeForm = document.getElementById(formId);
    if (activeForm) {
        activeForm.classList.remove('hidden');
    }
}

// Registration Form Validation
function validateRegistrationForm(event) {
    event.preventDefault();  // Prevent form submission
    
    // Clear existing errors
    clearErrors();

    let isValid = true;

    // Get input values
    const firstName = document.getElementById('first_name').value.trim();
    const lastName = document.getElementById('last_name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();

    // Check if all fields are filled
    if (!firstName || !lastName || !email || !phone || !password) {
        alert('All fields must be filled.');
        return false; // Stop further validation if any field is empty
    }

    // First name validation (only letters, min 2 characters)
    if (!/^[a-zA-Z]{2,}$/.test(firstName)) {
        showError('error_first_name', 'First name must contain at least 2 letters.');
        isValid = false;
    }

    // Last name validation (only letters, min 2 characters)
    if (!/^[a-zA-Z]{2,}$/.test(lastName)) {
        showError('error_last_name', 'Last name must contain at least 2 letters.');
        isValid = false;
    }

    // Email validation (simple pattern)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('error_email', 'Please enter a valid email address.');
        isValid = false;
    }

    // Phone number validation (10 digits, numbers only)
    if (!/^\d{10}$/.test(phone)) {
        showError('error_phone', 'Phone number must be 10 digits long.');
        isValid = false;
    }

    // Password validation (min 6 characters, at least one uppercase letter, one lowercase letter, and one number)
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)) {
        showError('error_password', 'Password must be at least 6 characters, with at least one uppercase letter, one lowercase letter, and one number.');
        isValid = false;
    }

    // If all validations pass
    if (isValid) {
        alert('Registration successful!');
        toggleForm('loginForm'); // Redirect to login form after successful registration
    }
    return isValid;
}

// Function to show error messages
function showError(elementId, message) {
    document.getElementById(elementId).innerText = message;
}

// Function to clear all error messages
function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => element.innerText = '');
}

// Login Form Validation
function validateLoginForm(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("login_email").value.trim();
    const password = document.getElementById("login_password").value.trim();
    let isValid = true;

    // Simple email validation pattern
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('error_login_email', 'Please enter a valid email address.');
        isValid = false;
    } else {
        clearError('error_login_email');
    }

    // Password validation (example: minimum 6 characters)
    if (password.length < 6) {
        showError('error_login_password', 'Password must be at least 6 characters.');
        isValid = false;
    } else {
        clearError('error_login_password');
    }

    if (isValid) {
        alert('Login successful!');
        toggleForm('bookingForm');  // Redirect to booking page
    }
}

// Function to show error messages
function showError(id, message) {
    document.getElementById(id).innerText = message;
}

// Function to clear error messages
function clearError(id) {
    document.getElementById(id).innerText = '';
}

// Attach event listener to login form
document.getElementById('loginFormElement').addEventListener('submit', validateLoginForm);

// Booking Form Submission
function submitBookingForm(event) {
    event.preventDefault();

    let bookingType = document.getElementById("booking_type").value;
    let summary = '';

    // Construct booking summary based on type
    if (bookingType === 'room') {
        summary = `Room Category: ${document.getElementById("room_category").value}, 
                    Number of Guests: ${document.getElementById("num_guests").value}, 
                    Check-in Date: ${document.getElementById("check_in_date").value}, 
                    Check-out Date: ${document.getElementById("check_out_date").value}`;
    } else if (bookingType === 'car') {
        summary = `Car Category: ${document.getElementById("car_category").value}, 
                    Destination: ${document.getElementById("destination").value}, 
                    Pick-up Date: ${document.getElementById("pickup_date").value}, 
                    Drop-off Date: ${document.getElementById("drop_off_date").value}`;
    } else {
        summary = `Room Category: ${document.getElementById("room_category").value}, 
                    Number of Guests: ${document.getElementById("num_guests").value}, 
                    Check-in Date: ${document.getElementById("check_in_date").value}, 
                    Check-out Date: ${document.getElementById("check_out_date").value}, 
                    Car Category: ${document.getElementById("car_category").value}, 
                    Destination: ${document.getElementById("destination").value}, 
                    Pick-up Date: ${document.getElementById("pickup_date").value}, 
                    Drop-off Date: ${document.getElementById("drop_off_date").value}`;
    }

    // Generate Booking ID
    const bookingId = 'BOOK' + Math.floor(Math.random() * 100000);
    document.getElementById("bookingId").textContent = bookingId;
    document.getElementById("summaryDetails").textContent = summary;
    document.getElementById("bookingSummary").classList.remove('hidden');
    return false;
}

// Toggle the visibility of booking details based on the type of booking selected
function toggleBookingDetails() {
    const bookingType = document.getElementById("booking_type").value;
    if (bookingType === 'room') {
        document.getElementById("roomDetails").classList.remove('hidden');
        document.getElementById("carDetails").classList.add('hidden');
    } else if (bookingType === 'car') {
        document.getElementById("carDetails").classList.remove('hidden');
        document.getElementById("roomDetails").classList.add('hidden');
    } else {
        document.getElementById("roomDetails").classList.remove('hidden');
        document.getElementById("carDetails").classList.remove('hidden');
    }
}
document.getElementById('trackBookingForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const trackingId = document.getElementById('trackingId').value;

    const response = await fetch('track_booking.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `bookingID=${trackingId}`
    });

    const result = await response.json();
    if (result.booking_id) {
        document.getElementById('trackingResult').innerText = JSON.stringify(result, null, 2);
    } else {
        alert(result.error || 'Booking not found.');
    }
});
function sendAjaxRequest(formData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'process.php', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            callback(response);
        }
    };
    xhr.send(formData);
}
