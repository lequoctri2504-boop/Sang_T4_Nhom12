<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use Illuminate\Routing\Controller as RoutingController;

class QuizController extends RoutingController
{
    public function index()
    {
        $quizzes = Quiz::with('letter')->get()->map(function ($quiz) {
            return [
                'id'       => $quiz->id,
                'type'     => $quiz->type,
                'question' => $quiz->question,
                'options'  => is_string($quiz->options) ? json_decode($quiz->options, true) : $quiz->options,
                'correct_answer'   => $quiz->answer,
                'letter'   => $quiz->letter ? [
                    'id' => $quiz->letter->id,
                    'name' => $quiz->letter->name,
                    'audio_url' => $quiz->letter->audio ? asset('storage/' . $quiz->letter->audio) : null,
                ] : null,
            ];
        });
        return response()->json(['success' => true, 'data' => $quizzes]);
    }

    public function random(\Illuminate\Http\Request $request)
    {
        $limit = $request->query('limit', 4);
        // Lấy random câu, kèm tên chữ cái
        $quizzes = Quiz::with('letter')
            ->inRandomOrder()
            ->limit($limit)
            ->get()
            ->map(function ($quiz) {
                return [
                    'id'       => $quiz->id,
                    'type'     => $quiz->type,
                    'question' => $quiz->question,
                    'options'  => is_string($quiz->options) ? json_decode($quiz->options, true) : $quiz->options,
                    'answer'   => $quiz->answer,
                    'letter'   => $quiz->letter->name ?? null,
                    'image_url'=> ($quiz->letter && $quiz->letter->image) ? asset('storage/' . $quiz->letter->image) : null,
                    'audio_url'=> ($quiz->letter && $quiz->letter->audio) ? asset('storage/' . $quiz->letter->audio) : null,
                ];
            });

        return response()->json(['success' => true, 'data' => $quizzes]);
    }
}