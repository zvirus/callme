<?php 
// украинцы — мирный и спокойный народ :)
// dedushka.org // nazartokar.com // qbx.me // nazartokar@gmail.com
// callme 2.2

//require("smtp.php");
header ("Content-Type: text/html; charset=utf-8"); //кодировка
$to = "yr@domain.net"; //получатель уведомлений

// не трогать

$HTTP_HOST = parse_url ("http://".$_SERVER["HTTP_HOST"]); 
$HTTP_HOST = str_replace (array ("http://","www."), "", $HTTP_HOST["host"]);
$from = "noreply@".$HTTP_HOST; // отправитель. Если настраиваете smtp, не забудьте указать в $from вашу почту

// данные для отправки смс

$sms['id']  = '';
$sms['key'] = '';
$sms['log'] = '';
$sms['pss'] = '';
$sms["frm"] = "callme"; // добавьте новую подпись в смс-шлюзе и дождитесь апрува. Для sms-fly.com, sms-sms.com.ua по умолчанию используется АИ SMS
$sms["num"] = ""; // ваш номер в формате без + (79218886622, 380501234567)
$sms["prv"] = "sms-sms.com.ua"; // на выбор: sms.ru, infosmska.ru, bytehand.com, sms-sending.ru, smsaero.ru, sms-fly.com, sms-sms.com.ua

function uc ($s) {
	return urlencode($s);
}

function gf ($s) { 
	$s = substr( (htmlspecialchars($_GET[$s])), 0, 500);
	if (strlen($s) > 1) return $s;
}

function sendSMS ($to = "", $msg){
	global $sms;
	
	# исправляем косяки автора. Он не передает номер телефона в параметре $to
	$to = (empty($to)) ? $sms["num"] : $to; 
	if($sms["prv"] == 'sms-fly.com' || $sms["prv"] == 'sms-sms.com.ua')
	{
		$description = htmlspecialchars('SMS from Buyme 1.4');
		# Подменим общее Альфанумерическое имя на доступное на этом сервисе (SMS) по умолчанию всем клиентам
		# В случае индивидуального Альфаимени используется из конфига
		$sms["frm"] = ($sms["frm"] == "callme") ? "SMS" : $sms["frm"];

		# проверка на доступность CURL
		if (function_exists('curl_init')) 
		{
			# экранируем текст
			#$msg = htmlspecialchars($msg);
			$myXML 	 = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
			$myXML 	.= "<request>";
			$myXML 	.= "<operation>SENDSMS</operation>";
			$myXML 	.= '		<message start_time="AUTO" end_time="AUTO" livetime="5" rate="120" desc="'.$description.'" source="'.$sms["frm"].'">'."\n";
			$myXML 	.= "		<body>".$msg."</body>";
			$myXML 	.= "		<recipient>".$to."</recipient>";
			$myXML 	.=  "</message>";
			$myXML 	.= "</request>";
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_USERPWD , $sms["log"].':'.$sms["pss"]);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_URL, 'http://'.$sms["prv"].'/api/api.php');
			curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: text/xml", "Accept: text/xml"));
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $myXML);
			$response = curl_exec($ch); // тут содержится ответ от сервера. Можно распарсить и вернуть ошибку, если необходимо
			curl_close($ch);
		} 
		else 
		{
			# пробуем отправить через сокеты
			$line = array();  
			$is_data = false;
			$fp = fsockopen($sms["prv"], 80, $errno, $errstr, 30); 
			if (!$fp) 
			{ 
				echo "$errstr ($errno)<br />\n";  // эту ошибку при отправке тоже бы обработать
			}
			else  
			{  
				$data 	  	 = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
				$data 	  	.= "<request>";
				$data 	  	.= "<operation>SENDSMS</operation>";
				$data 	  	.= '		<message start_time="AUTO" end_time="AUTO" livetime="3" rate="120" desc="'.$description.'" source="'.$sms["frm"].'">'."\n";
				$data 	  	.= "		<body>".$msg."</body>";
				$data 	  	.= "		<recipient>".$to."</recipient>";
				$data 	  	.=  "</message>";
				$data 	  	.= "</request>";				
				
				$headers = "POST /api/api.php HTTP/1.1\r\n";  
				$headers .= "Host: ".$sms["prv"]."\r\n";  
				$headers .= 'Authorization: Basic '.base64_encode($sms["log"].':'.$sms["pss"])."\r\n";           
				$headers .= "Content-type: text/xml\r\n";  
				$headers .= "Content-Length: ".strlen($data)."\r\n\r\n";  
				fwrite($fp, $headers.$data);  
				while (!feof($fp))  
				{  
					$one_line = fgets($fp, 1024);
					if($one_line == "\r\n") {
						$is_data = ($is_data) ? false : true;
					}
					if($is_data) $line[] = $one_line; // тут содержится ответ от сервера. Можно распарсить и вернуть ошибку, если необходимо
				} 
				fclose($fp);  
			}  
		}
	}
	else
	{
		$u['sms.ru'] = "sms.ru/sms/send?api_id=".uc($sms["key"])."&to=".uc($sms["num"])."&text=".uc($msg);
		$u['bytehand.com'] = "bytehand.com:3800/send?id=".uc($sms["id"])."&key=".uc($sms["key"])."&to=".uc($sms["num"])."&partner=callme&from=".uc($sms["frm"])."&text=".uc($msg);
		$u['sms-sending.ru'] = "lcab.sms-sending.ru/lcabApi/sendSms.php?login=".uc($sms["log"])."&password=".uc($sms["pss"])."&txt=".uc($msg)."&to=".uc($sms["num"]);
		$u['infosmska.ru'] = "api.infosmska.ru/interfaces/SendMessages.ashx?login=".uc($sms['log'])."&pwd=".uc($sms["pss"])."&sender=SMS&phones=".uc($sms["num"])."&message=".uc($msg);
		$u['smsaero.ru'] = "gate.smsaero.ru/send/?user=".uc($sms["log"])."&password=".md5 (uc($sms["pss"]))."&to=".uc($sms["num"])."&text=".uc($msg)."&from=".uc($sms["frm"]);
	
		@$r = file_get_contents("http://".$u[$sms["prv"]]);	
	}
	
}

function translit ($str) { // translit by programmerz.ru
	$tr = array("А"=>"A","Б"=>"B","В"=>"V","Г"=>"G","Д"=>"D","Е"=>"E","Ж"=>"J","З"=>"Z","И"=>"I","Й"=>"Y","К"=>"K","Л"=>"L","М"=>"M","Н"=>"N","О"=>"O","П"=>"P","Р"=>"R","С"=>"S","Т"=>"T","У"=>"U","Ф"=>"F","Х"=>"H","Ц"=>"TS","Ч"=>"4","Ш"=>"SH","Щ"=>"SCH","Ъ"=>"","Ы"=>"YI","Ь"=>"","Э"=>"E","Ю"=>"YU","Я"=>"YA","а"=>"a","б"=>"b","в"=>"v","г"=>"g","д"=>"d","е"=>"e","ж"=>"j","з"=>"z","и"=>"i","й"=>"y","к"=>"k","л"=>"l","м"=>"m","н"=>"n","о"=>"o","п"=>"p","р"=>"r","с"=>"s","т"=>"t","у"=>"u","ф"=>"f","х"=>"h","ц"=>"ts","ч"=>"4","ш"=>"sh","щ"=>"sch","ъ"=>"y","ы"=>"yi","ь"=>"","э"=>"e","ю"=>"yu","я"=>"ya");
	return strtr($str, $tr);
}

function addToMess ($c, $o) {
	global $mess;
	if (strlen ($o) > 2) {
		$mess = $mess.'<div style="margin:3px 0;background: #ffe1e0;border: 1px solid #cecece;padding:10px"><b>'.$c.':</b><br>'.$o.'</div>';
	}
}

function jsAnswer ($result, $cls, $time, $message) {
	echo '{"result": "'.$result.'","cls": "'.$cls.'","time": "'.$time.'","message": "'.$message.'"}';
	exit ();
}

function getOptions ($o) { // get callme options
	$cs = $_GET["cs"];
	$os = $_GET["os"];
	$i = 0;	
	$opts = " ";

	if ($o == 1) {
		$opts = '<div style="background: #fffce8;border:1px solid #cecece;padding:10px 10px 0">';

		foreach ($os as $value) {
			if((strlen($value) != 0) && ($value != "0")) {
				$opts .= "<b>".$cs[$i]."</b><br>".$value."<br><br>";
			}
			$i++;
		}
		$opts .= '</div>';
	} else {
		foreach ($os as $value) {
			if ((strlen($value) != 0) && ($value != "0")) {
				$opts .= $cs[$i]."(".$value.") ";
			}
			$i++;
		}		
	}
	return $opts;
}

$time = time (); // время отправки
$interval = $time - (gF("ctime"));
if ($interval < 1) { // интервал отправки (сек)
	jsAnswer ("error", "c_error", "", "Сообщение уже было отправлено.");
} else {
	//$get_data = gF('os');
	$get_data = $_GET["cs"];

	if (count($get_data) > 1) { // data to send
		$os = $_GET["os"];
		$cs = $_GET["cs"];
		$ip = $_SERVER["REMOTE_ADDR"];

		$title 	= "CallMe: обратный звонок";
		$title 	= "=?UTF-8?B?".base64_encode($title)."?=";
		$mess 	= "";

		$mess  .= getOptions(1);

		if (ini_get('allow_url_fopen')) { // get city 
			$ip 		= $_SERVER["REMOTE_ADDR"];
			@$geo 	= file_get_contents("http://freegeoip.net/json/".$ip);
			@$geo 	= json_decode ($geo, true);

			addToMess ("Откуда запрос", ($geo['city']." / ".$geo['country_name']." / ".$ip));
		}

		$mess = $mess."<hr><a href='http://dedushka.org/tag/callme/'>Следите</a> за обновлениями.<br>Спасибо за использование Callme.";
		
		$headers	 = "Content-type: text/html; charset=utf-8\r\n"; 
		$headers	.= "From: Callme 2.2 <".$from.">\r\n"; 

		$sms['msg'] = translit((getOptions(0)));
		$sms['msg'] = substr($sms['msg'], 0, 160);

		if ($to != 'yr@domain.net') { 
			mail($to, $title, $mess, $headers); 
		}

		if ( ($sms['id'] != '') || ($sms['key'] != '') || ($sms['log'] != '') ) {
			@sendSMS($num, $sms['msg']); 
		}
		jsAnswer('success', 'c_success', '', 'Спасибо, сообщение отправлено');
	} else {
		jsAnswer('error', 'c_error', '', 'Ошибка');
	}
}
?>
