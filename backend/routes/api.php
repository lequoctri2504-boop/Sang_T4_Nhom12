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
Route::get('/quizzes/random',[QuizController::class, 'random']);

// Điểm số & Xếp hạng
Route::get('/scores',        [ScoreController::class, 'index']);
Route::post('/scores',       [ScoreController::class, 'store']);

// Thú cưng (Stickers)
Route::get('/stickers',      [\App\Http\Controllers\Api\StickerController::class, 'index']);
Route::post('/stickers/buy', [\App\Http\Controllers\Api\StickerController::class, 'buy']);
Route::get('/user-stickers', [\App\Http\Controllers\Api\StickerController::class, 'userStickers']);

// Auth
Route::post('/login',    [\App\Http\Controllers\Api\LoginController::class, 'login']);
Route::post('/register', [\App\Http\Controllers\Api\LoginController::class, 'register']);
Route::get('/me',        [\App\Http\Controllers\Api\LoginController::class, 'me']);