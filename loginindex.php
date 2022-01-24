<?php
    $conn = mysqli_connect("localhost","root","","project");
	session_start();
	$temp_uname = $_POST['username'];
	$temp_pass = $_POST['pass'];
	$check = mysqli_query($conn,"SELECT count(*) FROM user_details WHERE password = '".$temp_pass."' and username ='" .$temp_uname."';");
	$row = mysqli_fetch_row($check);
	if($row[0] == 1)
	{
		$_SESSION['uname'] = $temp_uname;
        header("Location: http://localhost/project/homeindex.html");
	}
	else
	{
        header("Location: http://localhost/project/loginindex.html");
	}
 ?>
