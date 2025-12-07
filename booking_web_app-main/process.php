<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Customerdatabase";

// Create connection
$conn = new mysqli("localhost", "root", "","Customerdatabase");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle registration
if (isset($_POST['register'])) {
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $sql = "INSERT INTO customers (first_name, last_name, email, phone, password) 
            VALUES ('$first_name', '$last_name', '$email', '$phone', '$password')";

    if ($conn->query($sql) === TRUE) {
        header("Location: login.html");
        die;
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Handle booking
if (isset($_POST['book_now'])) {
    $email = $_POST['email'];
    $booking_type = $_POST['booking_type'];
    $details = $_POST['details'];
    $check_in = $_POST['check_in'];
    $check_out = $_POST['check_out'];

    $sql = "INSERT INTO bookings32 (customer_email, booking_type, details, check_in, check_out) 
            VALUES ('$email', '$booking_type', '$details', '$check_in', '$check_out')";

    if ($conn->query($sql) === TRUE) {
         header("Location: booking.html");
        die;
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close connection
$conn->close();
?>
