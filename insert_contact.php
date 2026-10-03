
<?php

$conn = mysqli_connect("localhost", "root", "", "contact_management");

if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}

$name = "Raja";
$phone = "9500985429";
$email = "raja@gmail.com";

$sql = "INSERT INTO contacts (name, phone, email)
        VALUES ('$name', '$phone', '$email')";

if (mysqli_query($conn, $sql)) {
    echo "Contact inserted successfully!";
} else {
    echo "Error: " . mysqli_error($conn);
}

mysqli_close($conn);

?>