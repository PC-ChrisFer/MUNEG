

window.sendEmail = async () => {
       
      Email.send({
        SecureToken : "7f60fbb3-e23f-4542-9010-992f11fbda7f",
        To : 'jetixsolrozano@gmail.com',
        From : "sendgridsubscription@gmail.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
}

 