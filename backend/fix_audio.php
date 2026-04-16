<?php
require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

// Fix audio for all letters - standardize format and fix reversed Ă/Â
$audioMap = [
    'A' => 'a.mp3',
    'Ă' => 'aw.mp3',
    'Â' => 'aa.mp3',
    'B' => 'b.mp3',
    'C' => 'c.mp3',
    'D' => 'd.mp3',
    'Đ' => 'dđ.mp3',
    'E' => 'e.mp3',
    'Ê' => 'ee.mp3',
    'G' => 'g.mp3',
    'H' => 'h.mp3',
    'I' => 'i.mp3',
    'K' => 'k.mp3',
    'L' => 'l.mp3',
    'M' => 'm.mp3',
    'N' => 'n.mp3',
    'O' => 'o.mp3',
    'Ô' => 'oo.mp3',
    'Ơ' => 'ơ.mp3',
    'P' => 'p.mp3',
    'Q' => 'q.mp3',
    'R' => 'r.mp3',
    'S' => 's.mp3',
    'T' => 't.mp3',
    'U' => 'u.mp3',
    'Ư' => 'ư.mp3',
    'V' => 'v.mp3',
    'X' => 'x.mp3',
    'Y' => 'y.mp3'
];

foreach ($audioMap as $letter => $audioFile) {
    DB::table('letters')->where('name', $letter)->update([
        'audio' => $audioFile
    ]);
    echo "✅ $letter → $audioFile\n";
}
echo "\n✅ All audio mappings fixed!\n";
?>
