<?php

include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = trim($_POST["name"] ?? "");
    $phone = trim($_POST["phone"] ?? "");
    $email = trim($_POST["email"] ?? "");

    if ($name === "" || $phone === "" || $email === "") {
        die("Please fill all fields.");
    }

    // Check duplicate phone number
    $check = $conn->prepare(
        "SELECT id FROM contacts WHERE phone = ?"
    );

    $check->bind_param("s", $phone);
    $check->execute();

    $result = $check->get_result();

    if ($result->num_rows > 0) {

        $check->close();
        $conn->close();

        die("This phone number already exists.");

    }

    $check->close();


    // Insert contact
    $stmt = $conn->prepare(
        "INSERT INTO contacts (name, phone, email)
         VALUES (?, ?, ?)"
    );

    if (!$stmt) {

        die(
            "Prepare Error: " .
            $conn->error
        );

    }


    $stmt->bind_param(
        "sss",
        $name,
        $phone,
        $email
    );


    if ($stmt->execute()) {

        echo "Contact added successfully!";

    } else {

        echo "Insert Error: " .
             $stmt->error;

    }


    $stmt->close();
}


$conn->close();

?>