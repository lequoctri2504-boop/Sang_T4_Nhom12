<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as RoutingController;
use Illuminate\Support\Facades\Auth;

class LoginController extends RoutingController
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            if ($user->role !== 'admin') {
                return response()->json(['message' => 'Không có quyền admin'], 403);
            }
            return response()->json(['success' => true, 'user' => $user]);
        }

        return response()->json(['message' => 'Sai email hoặc mật khẩu'], 401);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['success' => true]);
    }
}