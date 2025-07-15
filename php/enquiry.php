<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type to JSON
header('Content-Type: application/json');

// Allow CORS for development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$age = trim($_POST['age'] ?? '');
$category = trim($_POST['category'] ?? '');
$program = trim($_POST['program'] ?? '');
$message = trim($_POST['message'] ?? '');
$contactTime = trim($_POST['contactTime'] ?? 'anytime');

// Validate required fields
if (empty($name) || empty($email) || empty($phone) || empty($category)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address']);
    exit;
}

// Validate phone number (basic validation)
if (!preg_match('/^[\+]?[1-9][\d]{0,15}$/', str_replace([' ', '-', '(', ')'], '', $phone))) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid phone number']);
    exit;
}

// Sanitize inputs
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$age = htmlspecialchars($age, ENT_QUOTES, 'UTF-8');
$category = htmlspecialchars($category, ENT_QUOTES, 'UTF-8');
$program = htmlspecialchars($program, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
$contactTime = htmlspecialchars($contactTime, ENT_QUOTES, 'UTF-8');

// Prepare email content
$subject = "New Enquiry from Beat Busters Dance Center Website";
$emailContent = "
New enquiry received from the website:

Name: $name
Email: $email
Phone: $phone
Age: " . ($age ? $age : 'Not specified') . "
Category: $category
Program: " . ($program ? $program : 'Not specified') . "
Preferred Contact Time: $contactTime

Additional Information:
" . ($message ? $message : 'No additional information provided') . "

---
This enquiry was submitted from the Beat Busters Dance Center website.
";

// Recipient email (replace with your actual email)
$to = "info@beatbusters.com"; // Change this to your email

// Email headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Try to send email
$mailSent = mail($to, $subject, $emailContent, $headers);

if ($mailSent) {
    // Log the enquiry (optional)
    $logEntry = date('Y-m-d H:i:s') . " - Enquiry from $name ($email) - Category: $category\n";
    file_put_contents('../logs/enquiries.log', $logEntry, FILE_APPEND | LOCK_EX);
    
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you! Your enquiry has been submitted successfully. We will contact you soon.'
    ]);
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Sorry, there was an error sending your enquiry. Please try again or contact us directly.'
    ]);
}
?> 