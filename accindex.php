<?php
    $conn = mysqli_connect("localhost","root","","project");
    if( isset( $_POST['submit_form'] ) ){
        $name_val = $_POST['name'];
        $uname_val = $_POST['uname'];
        $email_val = $_POST['email'];
        $phone_val = $_POST['phone'];
        $pass_val = $_POST['pass'];
        echo '$name_val';
        mysqli_query($conn, "insert into user_details values ('$name_val','$uname_val','$email_val','$phone_val','$pass_val')");
        header("Location: http://localhost/project/loginindex.html");
    }
?>