<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = strip_tags(trim($_POST["name"]));
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $phone = isset($_POST["phone"]) ? strip_tags(trim($_POST["phone"])) : '';
  $message = trim($_POST["message"]);

  if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message)) {
    http_response_code(400);
    echo "Please complete the form properly.";
    exit;
  }

  $to = "akthakur8423@gmail.com"; // यहाँ अपना email डालें जहाँ messages आएँगे
  $subject = "New contact from $name";
  $email_content = "Name: $name\n";
  $email_content .= "Email: $email\n";
  $email_content .= "Phone: $phone\n\n";
  $email_content .= "Message:\n$message\n";

  $email_headers = "From: $name <$email>";

  if (mail($to, $subject, $email_content, $email_headers)) {
    http_response_code(200);
    echo "Thank you, your message has been sent.";
  } else {
    http_response_code(500);
    echo "Oops! Something went wrong and we couldn't send your message.";
  }
} else {
  http_response_code(403);
  echo "There was a problem with your submission, please try again.";
}
?>
