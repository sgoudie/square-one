<?php

class ContactFormHandler {

  function handleContactForm() {

  if($this->isFormSubmitted() && $this->isNonceSet()) {
    if($this->isFormValid()) {
      $this->sendContactForm();
    } else {
      $this->displayContactForm();
    }
  } else {
    $this->displayContactForm();
  }

 }

 public function sendContactForm() {
    $contactName = $_POST['contactName'] ;
    $contactEmail = $_POST['contactEmail'];
    $contactContent = $_POST['contactMessage'];

    $emailTo = 'get_option( 'admin_email')';

    $subject = 'Contact via site';
    $body = "Name: $contactName \n\nEmail: $contactEmail \n\nMessage: $contactContent";
    $headers = 'From: '.$contactName.' <'.$emailTo.'>' . "\r\n" . 'Reply-To: ' . $contactEmail;

    wp_mail($emailTo, $subject, $body, $headers);

    echo "<h3>Message sent. We will reply shortly!";
  }


 function isNonceSet() {
   if( isset( $_POST['nonce_field_for_submit_contact_form'] )  &&
     wp_verify_nonce( $_POST['nonce_field_for_submit_contact_form'], 'submit_contact_form' ) ) return true;
   else return false;
 }

 function isFormValid() {
   //Check all mandatory fields are present.
  if ( trim( $_POST['contactName'] ) === '' ) {
    $error = 'Please enter your name.';
    $hasError = true;
  } else if (!filter_var($_POST['contactEmail'], FILTER_VALIDATE_EMAIL)  ) {
    $error = 'Please enter a valid email.';
    $hasError = true;
  } else if ( trim( $_POST['contactMessage'] ) === '' ) {
    $error = 'Please enter a message.';
    $hasError = true;
  }

  //Check if any error was detected in validation.
  if($hasError == true) {
    echo $error;
    return false;
  }
  return true;
 }

  function isFormSubmitted() {
   if( isset( $_POST['submitContactForm'] ) ) return true;
   else return false;
 }

  //This function displays the Contact form.
  public function displayContactForm() {
    ?>
    <div class="contact-form" id="contactFormSection">
      <form action="" id="contactForm" method="POST" novalidate="novalidate" autocomplete="on" enctype="multipart/form-data">
        <div class="form-group">
          <label for="contactName">Name:</label>
          <input type="text" class="form-control" name="contactName">
        </div>
        <div class="form-group">
          <label for="contactEmail">Email:</label>
          <input type="email" class="form-control" name="contactEmail">
        </div>
        <div class="form-group">
          <label for="contactMessage">Message:</label>
          <textarea type="text" class="form-control" name="contactMessage" rows=6></textarea>
        </div>
        <div class="form-group">
          <label for="human">What does 3 + 5 equal?</label>
          <input type="text" class="form-control" name="human" placeholder="Prove you're a human!">
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary" name="submitContactForm">Send Message</button>
        </div>

        <?php wp_nonce_field( 'submit_contact_form' , 'nonce_field_for_submit_contact_form'); ?>
      </form>
    </div>
    <?php
  }

}

?>
