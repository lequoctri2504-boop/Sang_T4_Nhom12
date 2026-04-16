<?php
require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

// Use raw query to bypass any character encoding issues
$letters = DB::select('SELECT id, name, audio FROM letters ORDER BY id');

echo "Database contents (raw SQL):\n";
foreach ($letters as $row) {
    echo "ID: " . $row->id . " | Name: " . $row->name . " | Audio: " . $row->audio . "\n";
}
?>
