<html>
<body>
<style>
   input[type=radio] {
    border: 1px;
    width: 50px;
    height: 50px;
}
   input[type=submit] {
   margin-left: 20px;	
}
	body{
		background: black;
		color: white;
		text-align: center;
}
	td{
		padding-left: 25px;
		padding-right: 25px;
}
	
</style>
<h1>Imagine.. this is a lamp</h1>

	<br>
	<br>
	<form method = "post">
	<table align="center" border="dashed" style="border-color:red">
		<tr>
			<td>
			<input type="radio" name ="on_off" <?php if ((isset($radio_value)) && ($radio_value==$on)) ?> value = "On">
			</td>
			<td>
			<input type="radio" name ="on_off" <?php if ((isset($radio_value)) && ($radio_value==$off)) ?> value = "Off">	
			</td>
		</tr>
		<tr>
			<td style="text-align:center">
			 	On
			</td>
			<td style="text-align:center">
				Off
			</td>
		</tr> 
	</table>
	<br>
	<input type = "Submit" name ="Submit" value="Submit">
	</form>
			
	<h1>The current status is... 
	<br>
	</h1>

	<?php
		//$value = file_get_contents("value.txt");
		if ($_POST!=null){
			$on = "On";
			$off = "Off";
			$file = fopen("value.txt",'w+');
			
			//read in user fields (text box or radio button
			$radio_value = $_POST['on_off'];	

			//read in the radio buttons and write the status to file
			if ($radio_value == $on){
				fwrite($file, $on);
				echo '<img src="img/download.png" alt="">';
			}
			if ($radio_value == $off){
				fwrite($file, $off);
				echo '<img src="img/download0.png" alt="">';
			}

			//close			
			fclose($file);						
		}		
		else if($_POST!='Off'){
			$value = file_get_contents("value.txt");
			if($value == 'Off'){
				echo '<img src="img/download0.png" alt="">';
			}
			else
				echo '<img src="img/download.png" alt="">';
		}
		
	?>	
	<br>
	<b><?php 
		$value = file_get_contents("value.txt"); 
		echo $value
		?>
	</b>
</body>
</html>