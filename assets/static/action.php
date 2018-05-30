<?php
if((isset($_POST['mail'])&&$_POST['mail']!="")){ 
    $to = 'sir.ygorkagrishin@yandex.ru';
    $subject = 'Подписка';
    $message = '
            <html>
                <head>
                    <title>'.$subject.'</title>
                </head>
                <body>
                    <p>Почта: '.$_POST['mail'].'</p>                      
                </body>
            </html>'; 
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From: Отправитель <from@example.com>\r\n";
    mail($to, $subject, $message, $headers);
}
?>