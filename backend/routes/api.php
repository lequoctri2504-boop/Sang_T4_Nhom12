<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


use App\Http\Controllers\Api\AlphabetController;


Route::get('/alphabets', [AlphabetController::class, 'index']);
Route::get('/alphabets/{id}', [AlphabetController::class, 'show']);

// Route test
Route::get('/status', function() {
    return response()->json(['status' => 'Backend is running!']);
});



// Lấy danh sách chữ cái: GET http://127.0.0.1:8000/api/alphabets
Route::get('/alphabets', [AlphabetController::class, 'index']);

// Xem chi tiết: GET http://127.0.0.1:8000/api/alphabets/{id}
Route::get('/alphabets/{id}', [AlphabetController::class, 'show']);

// Thêm mới (Cho Admin): POST http://127.0.0.1:8000/api/alphabets
Route::post('/alphabets', [AlphabetController::class, 'store']);