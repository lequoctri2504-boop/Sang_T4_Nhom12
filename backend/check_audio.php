<?php
require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Letter;

// Get all letters with their audio
$letters = Letter::orderBy('id')->get(['id', 'name', 'audio']);

foreach ($letters as $letter) {
    echo $letter->name . " => " . $letter->audio . "\n";
}
?>
