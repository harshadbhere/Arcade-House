function validForm(){
      var str = "";

      if(document.querySelector("#name").value.length == 0){
        str += "Enter valid name\n";
      }

      if(document.querySelector("#uname").value.length == 0){
        str += "Enter valid username\n";
      }

      var password = document.querySelector("#pass").value;
      if(password.length == 0 || password.length<7)
        str += "Password should be greater than 7 characters\n";

      var mail = document.querySelector("#email");
      if(mail.value=="")
        str += "Email Field is Blank\n";
      else
      {
        if(mail.value.indexOf(' ') >=0)
         str += "Email Address Cannot have Space...\n";
        if(mail.value.indexOf('@')==-1)
          str += "Email address should contain @...\n";
        if(mail.value.indexOf('.')==-1)
          str += "Email Address should contain Dot..\n";
      }

      var contact = document.querySelector("#phone").value;
      if(contact.length != 10)
        str += "Enter valid contact number\n";

    if (str.length == 0)
          return true;

    return str;
    }

    function validate()
    {
        if (validForm() != true){
            alertswal();
        }
    }
    function alertswal(){
        event.preventDefault();
        swal({
                icon: 'error',
                title: 'Oops...',
                text: validForm(),
                timer: 3000,
            })
    }
    function confirmswal(){
        event.preventDefault();
        swal("Are you sure?", "Select accordingly", "success", {
        buttons: {
          yes: {
            text: "Submit",
            value: "yes"
          },
          no: {
            text: "Cancel",
            value: "no"
          }
        }
      }).then((value) => {
        if (value === "yes") {
        }
        return false;
      });
     }