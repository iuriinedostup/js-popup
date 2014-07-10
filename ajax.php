<?php
/**
 * Author: Yuriy Nedostup, yuriy.nedostup@gmail.com.
 * Version: 1.0
 * Date: 10.07.14 13:15
 */

if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    $name = isset($_POST['name']) ? $_POST['name'] : 'noname';
    $data = array(
        'result' => true,
        'data'   => '<div class="span6">
                     <h2>Hello, ' . $name . '! This is AJAX popup</h2>
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris ornare turpis nec tellus ultricies feugiat.
                        Phasellus lorem metus, pulvinar sed ultricies id, pharetra a nunc.
                     </p>
                     </div>'
    );
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    header('Location: /');
}