<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use Illuminate\Routing\Controller as RoutingController;

class QuizController extends RoutingController
{
    public function index()
    {
        // Lấy random 10 câu, kèm tên chữ cái
        $quizzes = Quiz::with('letter')
            ->inRandomOrder()
            ->limit(10)
            ->get()
            ->map(function ($quiz) {
                return [
                    'id'       => $quiz->id,
                    'type'     => $quiz->type,
                    'question' => $quiz->question,
                    'options'  => $quiz->options, // đã cast array tự động
                    'answer'   => $quiz->answer,
                    'letter'   => $quiz->letter->name,
                    'image_url'=> $quiz->letter->image
                                    ? asset('storage/' . $quiz->letter->image)
                                    : null,
                    'audio_url'=> $quiz->letter->audio
                                    ? asset('storage/' . $quiz->letter->audio)
                                    : null,
                ];
            });

        return response()->json(['success' => true, 'data' => $quizzes]);
    }
}