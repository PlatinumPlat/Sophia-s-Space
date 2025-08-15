<?php
	
	/*
		The Send Mail php Script for Contact Form
		Server-side data validation is also added for good data validation.
	*/
	
	$data['error'] = false;
	
	$name = $_POST['name'];
	$email = $_POST['email'];
	$subject = $_POST['subject'];
	$message = $_POST['message'];
	
	if( empty($name) ){
		$data['error'] = 'Please enter your name.';
	}else if(filter_var($email, FILTER_VALIDATE_EMAIL) == false){
		$data['error'] = 'Please enter a valid email address.';
	}else if( empty($subject) ){
		$data['error'] = 'Please enter your subject.';
	}else if( empty($message) ){
		$data['error'] = 'The message field is required!';
	}else{
		
		$file = 'messages.json';

		$json_data = file_get_contents($file);
		$messages = json_decode($json_data, true);
		if (!is_array($messages)) {
			$messages = [];
		}

		$messages[] = [
			'name' => $name,
			'email' => $email,
			'subject' => $subject,
			'message' => $message,
			'submitted_at' => date('Y-m-d H:i:s')
		];

		if (file_put_contents($file, json_encode($messages, JSON_PRETTY_PRINT))) {
			$data['error'] = false;
		} else {
			$data['error'] = 'Your message could not be received. Contact twinsophiapu@gmail.com about this issue.';
		}
	
	}
	
	echo json_encode($data);
?>