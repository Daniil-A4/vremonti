<?php
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $number = $_POST['number'];
    $realty = $_POST['realty'];
    $area = $_POST['area'];
    $design = $_POST['design'];
    $start = $_POST['start'];
    
    // Send message to Telegram
    $botToken = '6308045606:AAFb3Y95GUl71wXo4KOhwcfc5JFONCnv-bA';  // Replace with your Telegram bot token
    $chatId = '-1002030997749';  // Replace with your chat ID or channel username

    $telegramMessageForm = "Ім'я: $name\nНомер: $number\n";
    $telegramMessageQouz = "Ім'я: $name\nНомер: $number\nНерухомісь: $realty\nПлоща: $area\nДизайн проект: $design\nПочаток: $start";

    if ($realty) {
        $telegramMessage = $telegramMessageQouz;
    } else {
        $telegramMessage = $telegramMessageForm;
    }

    $telegramApiEndpoint = "https://api.telegram.org/bot$botToken/sendMessage";
    $telegramParams = array(
        'chat_id' => $chatId,
        'text' => $telegramMessage
    );

    $telegramCh = curl_init($telegramApiEndpoint);
    curl_setopt($telegramCh, CURLOPT_POST, 1);
    curl_setopt($telegramCh, CURLOPT_POSTFIELDS, $telegramParams);
    curl_setopt($telegramCh, CURLOPT_RETURNTRANSFER, true);
    $telegramResponse = curl_exec($telegramCh);
    curl_close($telegramCh);

    print_r('telegramResponse');

    if ($emailSent && $telegramResponse !== false) {
        ob_end_clean();
        // Redirect to another page
        header('Location: /thanks.html');
        exit();
    } 
}
?>