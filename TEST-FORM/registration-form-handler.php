<?php

function someFunc() {

  // Our variables
  $secret = 'Sr11HgKfiWTK8bBe4FbYgqjXXPGbq9zc';
  $targetURL = 'https://betandyou.com';
  $id = '12'; // [id] - идентификатор проекта
  $country = '804'; // [код_страны]​- двубуквенный код страны
  $currency = 'UAH'; // [код_валюты]​- трёхбуквенный код валюты
  $send_reg_data = '0'; // [send_reg_data]​- отправлять ли письмо с рег данными на почту или нет, по умолчанию не отправляется
  $tag = ''; //​ [tag]​- партнёрский тэг
  $promocode = ''; // [promocode] -​партнёрский промокод
  $bonus_choice = '2'; // [bonus_choice]​- 1 на спорт / 2 на казино / 3 отказаться
  $need_parse_phone = '0'; // [need_parse_phone] -​ в зависимости от того, как передаётся телефон, если передаётся без кода страны - то парсить не нужно и этот параметр должен быть 0 ( по умолчанию 0), при передаче телефона склеенного вместе с кодом в начале, нужно передавать этот параметр равным 1, чтобы апи распарсило телефон.
  $email = $_POST['email']; // [email]​- электронная почта, на которую необходимо зарегистрировать аккаунт
  $phone = $_POST['phone']; // [phone]​- телефон, на который необходимо зарегистрировать аккаунт
  $sign = md5( $secret . $id . $email ); // ​[подпись]​ = md5(secret + id + ([email] или [phone]))

  // Our url variable that we are going to pass to the server to get an ajax response
  $url = $targetURL .'/api/registrationbydata?id='. $id .'&country='. $country .'&currency='. $currency .'​&sign='. $sign .'​&email='. $email .'​&phone='. $phone .'​&send_reg_data='. $send_reg_data .'​&tag='. $tag .'​&promocode='. $promocode .'​&bonus_choice='. $bonus_choice .'​&need_parse_phone='. $need_parse_phone;


  $curl = curl_init($url);

  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  //for debug only!
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

  $resp = curl_exec($curl);

  curl_close($curl);

  return $resp; // return response from the server
  
}

// write function into a variable
$fg = someFunc();

// echo
echo $fg;



