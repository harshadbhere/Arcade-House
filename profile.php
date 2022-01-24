<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Profile</title>
	<link rel="icon" href="images/logo.png" type="image/icon type">
	<link rel="stylesheet" type="text/css" href="profilestyle.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script> 
</head>
<body>
	<div id="loader"></div>
	<div id="content">
	<div class="nav-div">
		<div class="nav-logo">
			<img class="logo-img" src="images/logo2.png" onclick="location.href='homeindex.html'">
		</div>
        <div class="logout-button-div">
            <button class="btn btn-2 btn--radius-2 btn-red" type="submit">Logout</button>
        </div>
	</div>
	<div class="container">
	<div class="card">
    <div class="img">
      <img src="images/logo.png">
    </div>
    <?php
    	session_start();
    	$conn = mysqli_connect("localhost","root","","project");
    ?>
    <div class="infos">
      	<div class="name">
	        <div class="h2"><?php 
	        		$fetch_data = mysqli_query($conn,"SELECT name FROM user_details WHERE username = '".$_SESSION['uname']."';");
	        		$temp = mysqli_fetch_row($fetch_data);
	        		echo $temp[0];
	        	?>
	        </div>
	        <div class="h4">@<?php 
	        		echo $_SESSION['uname'];
	        	?>
	        </div>
      	</div>
      	<div class="text">
        	Email: <?php 
        		$fetch_data = mysqli_query($conn,"SELECT email FROM user_details WHERE username = '".$_SESSION['uname']."';");
        		$temp = mysqli_fetch_row($fetch_data);
        		echo $temp[0];
        	?></br>
        	Phone: <?php 
        		$fetch_data = mysqli_query($conn,"SELECT phone FROM user_details WHERE username = '".$_SESSION['uname']."';");
        		$temp = mysqli_fetch_row($fetch_data);
        		echo $temp[0];
        	?>
      	</div>
      	<div class="stats">
      	<div class="nos">
	        <div class="h3">
	          	<?php 
	        		$fetch_data = mysqli_query($conn,"SELECT count(*) FROM games WHERE username = '".$_SESSION['uname']."';");
	        		$temp = mysqli_fetch_row($fetch_data);
	        		echo $temp[0];
	        	?>
	        </div>
	        <div class="h3">
	          	<?php 
	        		$fetch_data = mysqli_query($conn,"SELECT sum(win) FROM games WHERE username = '".$_SESSION['uname']."';");
	        		$temp = mysqli_fetch_row($fetch_data);
	        		echo $temp[0];
	        	?>
	        </div>
	        <div class="h3">
	          	<?php 
	        		$fetch_data = mysqli_query($conn,"SELECT score FROM games WHERE username = '".$_SESSION['uname']."' order by score desc;");
	        		$temp = mysqli_fetch_row($fetch_data);
	        		echo $temp[0];
	        	?>
	        </div>
	    </div>
	    <div class="titles">
	        <div class="titles1">Games</div>
	        <div class="titles1">Wins</div>
	        <div class="titles1">HighScore</div>
    	</div>
    	</div>
    </div>
</body>
</html>