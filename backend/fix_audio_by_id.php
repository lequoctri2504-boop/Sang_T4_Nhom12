<?php
require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

// Direct SQL updates with explicit values
$updates = [
    [1, 'A', 'a.mp3'],
    [2, 'Ă', 'aw.mp3'],
    [3, 'Â', 'aa.mp3'],
    [4, 'B', 'b.mp3'],
    [5, 'C', 'c.mp3'],
    [6, 'D', 'd.mp3'],
    [7, 'Đ', 'dđ.mp3'],
    [8, 'E', 'e.mp3'],
    [9, 'Ê', 'ee.mp3'],
    [10, 'G', 'g.mp3'],
    [11, 'H', 'h.mp3'],
    [12, 'I', 'i.mp3'],
    [13, 'K', 'k.mp3'],
    [14, 'L', 'l.mp3'],
    [15, 'M', 'm.mp3'],
    [16, 'N', 'n.mp3'],
    [17, 'O', 'o.mp3'],
    [18, 'Ô', 'oo.mp3'],
    [19, 'Ơ', 'ơ.mp3'],
    [20, 'P', 'p.mp3'],
    [21, 'Q', 'q.mp3'],
    [22, 'R', 'r.mp3'],
    [23, 'S', 's.mp3'],
    [24, 'T', 't.mp3'],
    [25, 'U', 'u.mp3'],
    [26, 'Ư', 'ư.mp3'],
    [27, 'V', 'v.mp3'],
    [28, 'X', 'x.mp3'],
    [29, 'Y', 'y.mp3']
];

foreach ($updates as $update) {
    $id = $update[0];
    $audio = $update[2];
    DB::update('UPDATE letters SET audio = ? WHERE id = ?', [$audio, $id]);
    echo "✅ ID $id → $audio\n";
}

echo "\n✅ All audio files updated by ID!\n";
?>
