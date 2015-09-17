jQuery(document).ready(function ($) {

    // Setup form validation on the #register-form element
    $("#contactForm").validate({
        // Specify the validation rules
        rules: {
            contactName: "required",
            contactEmail: {
                required: true,
                email: true
            },
            contactMessage: "required",
            human: {
                required: true,
                min: 8,
                max: 8,
            }
        },
        // Specify the validation error messages
        messages: {
            contactName: "Please enter your name",
            contactEmail: {
                required: "Please enter an email address",
                email: "Please enter a valid email address"
            },
            contactMessage: "Please enter a message",
            human: {
                required: "Solve this sum to prove you're a human",
                min: "Wrong answer, try again!",
                max: "Wrong answer, try again!"
            }
        }
    });
});
