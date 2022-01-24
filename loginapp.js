function validForm(){
      var str = "";

      if(document.querySelector("#username").value.length == 0){
        str += "Enter valid username\n";
      }

      var password = document.querySelector("#pass").value;
      if(password.length == 0 || password.length<4)
        str += "Password should be greater than 7 characters\n";

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