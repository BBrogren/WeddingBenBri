<?php

// Credit: http://codular.com/php-jquery-contact-form

// Blank message to start with so we can append to it.
$message = '';

// Declaring the variable for submitted inputs

$firstname 	= $_POST['firstname'];
$lastname 	= $_POST['lastname'];
$email 		= $_POST['email'];
$phone 		= $_POST['phone'];
$attendance	= $_POST['radio'];
$adultselect = $_POST['adultselect'];
$kidselect	= $_POST['kidselect'];
$song	= $_POST['song'];


// Check that all required inputs are not empty.
if(empty($firstname) || empty($lastname) || empty($attendance) || empty($email) || empty($phone) ) {
    die('Please ensure all required inputs are provided.');
}

//Validates correct email formatting
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die('Please use the correct format for your email and try again');
}

// Construct the message
$message .= <<<TEXT
An RSVP has been submitted!

Guest Details
=================================
Name: {$firstname} {$lastname}
Email: {$email}
Phone: {$phone}
Attendance: {$attendance}

Extras
=================================
Number of adults: {$adultselect}
Number of children: {$kidselect}
Song of choice: {$song}

TEXT;

// Email to send to
$to = 'rsvp@benandbri.com';

// Email Subject
$subject = 'BenAndBri.com | ' . $firstname . ' ' . $lastname . ' has submitted an RSVP!';

// Name to show email from
$from = 'rsvp@benandbri.com';

// Domain to show the email from
$fromEmail = 'rsvp@benandbri.com';

// Construct a header to send who the email is from
$header = 'From: ' . $from . '<' . $fromEmail . '>';

ini_set('SMTP', "mail.benandbri.com");
ini_set('smtp_port', "25");

// Try sending the email
if(!mail($to, $subject, $message, $header)) {
    die('Error sending email.');
} 
else {
    die('Thanks for submitting your RSVP.');
}


