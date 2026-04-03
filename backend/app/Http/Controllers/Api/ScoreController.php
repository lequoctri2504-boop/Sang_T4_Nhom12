<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Score;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as RoutingController;

class ScoreController extends RoutingController
{
    public function store(Request $request)
    {
        $score = Score::create([
            'player_name' => $request->input('player_name', 'Bé'),
            'correct'     => $request->input('correct', 0),
            'total'       => $request->input('total', 0),
            'stars'       => $this->calcStars(
                                $request->input('correct', 0),
                                $request->input('total', 0)
                             ),
        ]);

        return response()->json(['success' => true, 'data' => $score], 201);
    }

    private function calcStars($correct, $total)
    {
        if ($total == 0) return 0;
        $percent = ($correct / $total) * 100;
        if ($percent >= 80) return 3;
        if ($percent >= 50) return 2;
        if ($percent >= 30) return 1;
        return 0;
    }
}