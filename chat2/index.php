<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="main.css">
</head>
<body>	
<?php 
$colours = array('007AFF','FF7000','FF7000','15E25F','CFC700','CFC700','CF1100','CF00BE','F00');
$user_colour = array_rand($colours);
?>


<script src="jquery-3.1.1.js"></script>


<script language="javascript" type="text/javascript">  
$(document).ready(function(){
	//create a new WebSocket object.
	var wsUri = "ws://192.168.1.8:9000/chat2/server.php"; 	
	websocket = new WebSocket(wsUri); 
	
	websocket.onopen = function(ev) { // connection is open 
		$('#message_box').append("<div class=\"system_msg\">Connected!</div>"); //notify user
	}

	$('#send-btn').click(function(){ //use clicks message send button	
		var mymessage = $('#message').val(); //get message text
		var myname = $('#name').val(); //get user name
		
		if(myname == ""){ //empty name?
			alert("Enter your Name please!");
			return;
		}
		if(mymessage == ""){ //emtpy message?
			alert("Enter Some message Please!");
			return;
		}
		document.getElementById("name").style.visibility = "hidden";
		
		var objDiv = document.getElementById("message_box");
		objDiv.scrollTop = objDiv.scrollHeight;
		//prepare json data
		var msg = {
		message: mymessage,
		name: myname,
		color : '<?php echo $colours[$user_colour]; ?>'
		};
		//convert to JSON and send data to server
		websocket.send(JSON.stringify(msg));
	});
	
	//#### Message received from server?
	websocket.onmessage = function(ev) {
		var msg = JSON.parse(ev.data); //PHP sends Json data
		var type = msg.type; //message type
		var umsg = msg.message; //message text
		var uname = msg.name; //user name
		var ucolor = msg.color; //color

		if(type == 'usermsg') 
		{
			$('#message_box').append("<div><span class=\"user_name\" style=\"color:#"+ucolor+"\">"+uname+"</span> : <span class=\"user_message\">"+umsg+"</span></div>");
		}
		if(type == 'system')
		{
			$('#message_box').append("<div class=\"system_msg\">"+umsg+"</div>");
		}
		
		$('#message').val(''); //reset text
		
		var objDiv = document.getElementById("message_box");
		objDiv.scrollTop = objDiv.scrollHeight;
	};
	
	websocket.onerror	= function(ev){$('#message_box').append("<div class=\"system_error\">Error Occurred - "+ev.data+"</div>");}; 
	websocket.onclose 	= function(ev){$('#message_box').append("<div class=\"system_msg\">Connection Closed</div>");}; 
});




</script>
<div class="chat_wrapper">
<div class="message_box" id="message_box"></div>
<div class="panel">
<input type="text" name="name" id="name" placeholder="Your Name" maxlength="15" />

<input type="text" name="message" id="message" placeholder="Message" maxlength="80" 
onkeydown = "if (event.keyCode == 13)document.getElementById('send-btn').click()"  />





</div>

<button id="send-btn" class=button>Send</button>

</div>

</body>
</html>