<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Alphabet;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as RoutingController;

class AlphabetController extends RoutingController
{
    // Lấy toàn bộ danh sách chữ cái (Cho trang học tập)
    public function index() {
        return response()->json(Alphabet::all(), 200);
    }

    // Lấy chi tiết 1 chữ cái (Nếu cần)
    public function show($id) {
        $alphabet = Alphabet::find($id);
        if (!$alphabet) {
            return response()->json(['message' => 'Không tìm thấy chữ cái'], 404);
        }
        return response()->json($alphabet, 200);
    }

    // API cho Admin thêm chữ cái mới
    public function store(Request $request) {
        $data = Alphabet::create($request->all());
        return response()->json($data, 201);
    }
}