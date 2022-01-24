<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>2048</title>
	<link rel="icon" href="images/logo.png" type="image/icon type">
	<link rel="stylesheet" type="text/css" href="gamestyle.css">
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
	      	<div class="nav-logo-2">
	          	<img class="logo2-img" src="images/2048-logo.png" onclick="location.href='homeindex.html'">
	      	</div>
	</div>
	<div class="container">
		<div class="container-1">
			<div class="info">
				<div class="features">
					<audio src="Audio/mn_bg.mp3">
					</audio>
					<div class="fa-stack fa-lg f1" id="music">
					  <i class="fa fa-circle fa-stack-2x"></i>
					  <i class="fa fa-music fa-stack-1x fa-inverse"></i>
					</div>
					<div class="fa-stack fa-lg f2">
					  <i class="fa fa-circle fa-stack-2x"></i>
					  <i class="fa fa-volume-up fa-stack-1x fa-inverse"></i>
					</div>
					<div class="fa-stack fa-lg f3" id="full">
					  <i class="fa fa-circle fa-stack-2x"></i>
					  <i class="fa fa-arrows-alt fa-stack-1x fa-inverse"></i>
					</div>
					<div class="fa-stack fa-lg f4" id="screenshot">
					  <i class="fa fa-circle fa-stack-2x"></i>
					  <i class="fa fa-camera fa-stack-1x fa-inverse"></i>
					</div>
				</div>
				<div class="score-container">
					<div class="score-title">score</div>
					<span id="score">0</span>
				</div>
			</div>
			<div class="grid"></div>	
			<div class="buttons">
				<button id="forfeit" class="btn btn-2 btn--radius-2 btn-red">Forfeit</button>
		    	<button id="reset" class="btn btn-2 btn--radius-2 btn--green">Reset</button>
	    	</div>
	    </div>
	    
	    <div class="container-2-main">
	    	<div class="container-table" onclick="location.href='profile.php'">
		    	<div class="table-div">
			    	<table class="lb">
			    		<tr>
			    			<th>High Scores</th>
			    			<th>Username</th>
			    		</tr>
			    		<?php
							$conn = mysqli_connect("localhost","root","","project");
							$i = 0;
							$fetch_data = mysqli_query($conn,"SELECT * FROM games order by score desc;");
							while($i<4){
								$data = mysqli_fetch_array($fetch_data)
						?>
			    		<tr>
			    			<td><?php echo $data['score']; ?></td>
			    			<td><?php echo $data['username']; ?></td>
			    		</tr>
			    		<?php
			    				$i += 1;
			    			}
			    		?>
			    	</table>
			    </div>
			</div>
			<div class="container-chat">
				<div class="chat-wrapper">
					<div id="message-box"></div>
						<div class="user-panel">
							<input type="text" name="name" id="name" placeholder="Your Name" maxlength="15" />
							<input type="text" name="message" id="message" placeholder="Type your message here..." maxlength="100" />
							<button id="send-message">Send</button>
					</div>
				</div>
			</div>
	    </div>
	</div>
	</div>
</body>
	<?php
		$colors = array('#007AFF','#FF7000','#FF7000','#15E25F','#CFC700','#CFC700','#CF1100','#CF00BE','#F00');
		$color_pick = array_rand($colors);
	?>
	<script type="text/javascript" src="gameapp.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.min.js" integrity="sha512-tVYBzEItJit9HXaWTPo8vveXlkK62LbA+wez9IgzjTmFNLMBO1BEYladBw2wnM3YURZSMUyhayPCoLtjGh84NQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<script src="https://superal.github.io/canvas2image/canvas2image.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script type="text/javascript">
		var loader;

		  function loadNow(opacity) {
		      if (opacity <= 0) {
		          displayContent();
		      } else {
		          loader.style.opacity = opacity;
		          window.setTimeout(function() {
		              loadNow(opacity - 1);
		          }, 3000);
		      }
		  }

		  function displayContent() {
		      loader.style.display = 'none';
		      document.getElementById('content').style.display = 'block';
		  }

		  document.addEventListener("DOMContentLoaded", function() {
		      loader = document.getElementById('loader');
		  loadNow(1);
		  });

	</script>
	<script language="javascript" type="text/javascript">  
	//create a new WebSocket object.
	var msgBox = $('#message-box');
	var wsUri = "ws://localhost:9000/demo/server.php"; 	
	websocket = new WebSocket(wsUri); 
	
	websocket.onopen = function(ev) { // connection is open 
		msgBox.append('<div class="system_msg" style="color:#bbbbbb">Welcome to Global Chat!</div>'); //notify user
	}
	// Message received from server
	websocket.onmessage = function(ev) {
		var response 		= JSON.parse(ev.data); //PHP sends Json data
		
		var res_type 		= response.type; //message type
		var user_message 	= response.message; //message text
		var user_name 		= response.name; //user name
		var user_color 		= response.color; //color

		switch(res_type){
			case 'usermsg':
				msgBox.append('<div><span class="user_name" style="color:' + user_color + '">' + user_name + '</span> : <span class="user_message">' + user_message + '</span></div>');
				break;
			case 'system':
				msgBox.append('<div style="color:#bbbbbb">' + user_message + '</div>');
				break;
		}
		msgBox[0].scrollTop = msgBox[0].scrollHeight; //scroll message 

	};
	
	websocket.onerror	= function(ev){ msgBox.append('<div class="system_error">Error Occurred - ' + ev.data + '</div>'); }; 
	websocket.onclose 	= function(ev){ msgBox.append('<div class="system_msg">Connection Closed</div>'); }; 

	//Message send button
	$('#send-message').click(function(){
		send_message();
	});
	
	//User hits enter key 
	$( "#message" ).on( "keydown", function( event ) {
	  if(event.which==13){
		  send_message();
	  }
	});
	
	//Send message
	function send_message(){
		var message_input = $('#message'); //user message text
		var name_input = $('#name'); //user name
		
		if(message_input.val() == ""){ //empty name?
			alert("Enter your Name please!");
			return;
		}
		if(message_input.val() == ""){ //emtpy message?
			alert("Enter Some message Please!");
			return;
		}

		//prepare json data
		var msg = {
			message: message_input.val(),
			name: name_input.val(),
			color : '<?php echo $colors[$color_pick]; ?>'
		};
		//convert and send data to server
		websocket.send(JSON.stringify(msg));	
		message_input.val(''); //reset message input
	}
</script>
</html>