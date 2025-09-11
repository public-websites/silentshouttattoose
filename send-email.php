<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get form data
$input = json_decode(file_get_contents('php://input'), true);

$name = $input['name'] ?? 'Ingen namn angiven';
$email = $input['email'] ?? 'Ingen e-post angiven';
$phone = $input['phone'] ?? 'Ingen telefon angiven';
$message = $input['message'] ?? 'Inget meddelande';
$type = $input['type'] ?? 'okänd';

// Your email settings
$to = $type === 'tattoo' ? 'tatuering@silentshouttattoo.se' : 'konst@silentshouttattoo.se'; 
$subject = $type === 'tattoo' ? 'Ny tatueringsförfrågan från Silent Shout Tattoo' : 'Ny konstförfrågan från Silent Shout Tattoo';

// Email body
$body = "Ny förfrågan från Silent Shout Tattoo webbsida\n\n";
$body .= "Typ: " . ($type === 'tattoo' ? 'Tatueringsförfrågan' : 'Konstförfrågan') . "\n";
$body .= "Namn: $name\n";
$body .= "E-post: $email\n";
$body .= "Telefon: $phone\n\n";
$body .= "Meddelande:\n$message\n";

// Email headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'E-post skickad']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Kunde inte skicka e-post']);
}
?>
