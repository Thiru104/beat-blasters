<?php
// Enable error reporting for debugging (remove in production)
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

// Include PHPMailer
require_once '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to validate email
function is_valid_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

try {
    // Get and validate form data
    $name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
    $message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';
    
    // Validation
    if (empty($name) || empty($email) || empty($message)) {
        throw new Exception('All fields are required');
    }
    
    if (!is_valid_email($email)) {
        throw new Exception('Please enter a valid email address');
    }
    
    if (strlen($name) < 2) {
        throw new Exception('Name must be at least 2 characters long');
    }
    
    if (strlen($message) < 10) {
        throw new Exception('Message must be at least 10 characters long');
    }
    
    // Create PHPMailer instance
    $mail = new PHPMailer(true);
    
    // Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Change this to your SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'your-email@gmail.com'; // Change to your email
    $mail->Password = 'your-app-password'; // Change to your app password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    
    // Recipients
    $mail->setFrom($email, $name);
    $mail->addAddress('beatbusters@gmail.com', 'Beat Busters Dance Center'); // Change to your email
    $mail->addReplyTo($email, $name);
    
    // Content
    $mail->isHTML(true);
    $mail->Subject = 'New Contact Form Submission - Beat Busters Dance Center';
    
    // Email body
    $emailBody = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #e63946; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #e63946; }
            .value { margin-top: 5px; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Submission</h2>
                <p>Beat Busters Dance Center</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Name:</div>
                    <div class='value'>$name</div>
                </div>
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>$email</div>
                </div>
                <div class='field'>
                    <div class='label'>Message:</div>
                    <div class='value'>" . nl2br($message) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Submission Date:</div>
                    <div class='value'>" . date('F j, Y \a\t g:i A') . "</div>
                </div>
            </div>
            <div class='footer'>
                <p>This message was sent from the Beat Busters Dance Center website contact form.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $mail->Body = $emailBody;
    $mail->AltBody = "
    New Contact Form Submission - Beat Busters Dance Center
    
    Name: $name
    Email: $email
    Message: $message
    
    Submission Date: " . date('F j, Y \a\t g:i A') . "
    
    This message was sent from the Beat Busters Dance Center website contact form.
    ";
    
    // Send email
    $mail->send();
    
    // Send auto-reply to customer
    $autoReply = new PHPMailer(true);
    
    // Server settings for auto-reply
    $autoReply->isSMTP();
    $autoReply->Host = 'smtp.gmail.com';
    $autoReply->SMTPAuth = true;
    $autoReply->Username = 'your-email@gmail.com'; // Change to your email
    $autoReply->Password = 'your-app-password'; // Change to your app password
    $autoReply->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $autoReply->Port = 587;
    
    // Recipients for auto-reply
    $autoReply->setFrom('beatbusters@gmail.com', 'Beat Busters Dance Center');
    $autoReply->addAddress($email, $name);
    
    // Auto-reply content
    $autoReply->isHTML(true);
    $autoReply->Subject = 'Thank you for contacting Beat Busters Dance Center';
    
    $autoReplyBody = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #e63946; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
            .contact-info { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #e63946; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Thank You!</h2>
                <p>Beat Busters Dance Center</p>
            </div>
            <div class='content'>
                <p>Dear $name,</p>
                <p>Thank you for contacting Beat Busters Dance Center. We have received your message and will get back to you as soon as possible.</p>
                <p>In the meantime, here are our contact details:</p>
                <div class='contact-info'>
                    <strong>Phone Numbers:</strong><br>
                    74832 83045<br>
                    85538 93851<br><br>
                    <strong>Address:</strong><br>
                    Opposite To Canara Bank,<br>
                    Hosur Main Road,<br>
                    Bangalore - 68<br><br>
                    <strong>Timings:</strong><br>
                    Monday - Saturday: 9:00 AM - 9:00 PM<br>
                    Sunday: 10:00 AM - 6:00 PM
                </div>
                <p>We look forward to hearing from you!</p>
                <p>Best regards,<br>
                <strong>Beat Busters Dance Center Team</strong></p>
            </div>
            <div class='footer'>
                <p>This is an automated response. Please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $autoReply->Body = $autoReplyBody;
    $autoReply->AltBody = "
    Thank you for contacting Beat Busters Dance Center!
    
    Dear $name,
    
    Thank you for contacting Beat Busters Dance Center. We have received your message and will get back to you as soon as possible.
    
    Contact Details:
    Phone: 74832 83045, 85538 93851
    Address: Opposite To Canara Bank, Hosur Main Road, Bangalore - 68
    Timings: Monday - Saturday: 9:00 AM - 9:00 PM, Sunday: 10:00 AM - 6:00 PM
    
    We look forward to hearing from you!
    
    Best regards,
    Beat Busters Dance Center Team
    ";
    
    // Send auto-reply
    $autoReply->send();
    
    // Log the submission (optional)
    $logEntry = date('Y-m-d H:i:s') . " - Name: $name, Email: $email, Message: " . substr($message, 0, 100) . "...\n";
    file_put_contents('../logs/contact_form.log', $logEntry, FILE_APPEND | LOCK_EX);
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully.'
    ]);
    
} catch (Exception $e) {
    // Log error
    $errorLog = date('Y-m-d H:i:s') . " - Error: " . $e->getMessage() . "\n";
    file_put_contents('../logs/error.log', $errorLog, FILE_APPEND | LOCK_EX);
    
    // Return error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again later.'
    ]);
}
?> 