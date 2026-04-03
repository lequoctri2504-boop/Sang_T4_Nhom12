<?php
use App\Http\Controllers\Api\LetterController;
use App\Http\Controllers\Api\QuizController;
use App\Http\Controllers\Api\ScoreController;
use Illuminate\Support\Facades\Route;

// Test API còn sống không
Route::get('/status', fn() => response()->json(['status' => 'OK', 'message' => 'Backend đang chạy!']));

// Chữ cái
Route::get('/letters',       [LetterController::class, 'index']);
Route::get('/letters/{id}',  [LetterController::class, 'show']);

// Quiz
Route::get('/quizzes',       [QuizController::class, 'index']);

// Điểm số
Route::post('/scores',       [ScoreController::class, 'store']);