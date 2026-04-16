<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sticker;
use App\Models\User;
use App\Models\UserSticker;
use Illuminate\Routing\Controller as RoutingController;
use Illuminate\Http\Request;

class StickerController extends RoutingController
{
    public function index()
    {
        $stickers = Sticker::all();
        return response()->json([
            'success' => true,
            'data'    => $stickers
        ]);
    }

    public function userStickers(Request $request)
    {
        $userId = $request->input('user_id') ?? auth()->id() ?? 1;
        
        $userStickers = UserSticker::where('user_id', $userId)
            ->with('sticker')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $userStickers,
        ]);
    }

    public function buy(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'sticker_id' => 'required|integer',
        ]);

        // Kiểm tra đã sở hữu chưa
        $owned = UserSticker::where('user_id', $validated['user_id'])
            ->where('sticker_id', $validated['sticker_id'])
            ->first();

        if ($owned) {
            return response()->json([
                'success' => false,
                'message' => 'Bạn đã sở hữu sticker này'
            ], 400);
        }

        try {
            // Thêm sticker cho user
            $userSticker = UserSticker::create([
                'user_id' => $validated['user_id'],
                'sticker_id' => $validated['sticker_id'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Mua sticker thành công!',
                'data' => $userSticker,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi mua sticker: ' . $e->getMessage(),
            ], 500);
        }
    }
}
