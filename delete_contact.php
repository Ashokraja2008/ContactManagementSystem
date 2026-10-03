<?php

include "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Invalid request.");
}

$id = intval($_POST["id"] ?? 0);

if ($id <= 0) {
    die("Invalid contact ID.");
}

$stmt = $conn->prepare(
    "DELETE FROM contacts WHERE id = ?"
);

$stmt->bind_param("i", $id);

if ($stmt->execute()) {

    if ($stmt->affected_rows > 0) {
        echo "Contact deleted successfully!";
    } else {
        echo "Contact not found.";
    }

} else {

    echo "Delete Error: " . $stmt->error;

}

$stmt->close();
$conn->close();

?>