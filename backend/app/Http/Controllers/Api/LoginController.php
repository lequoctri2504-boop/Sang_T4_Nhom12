<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as RoutingController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends RoutingController
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'parent', // Mặc định là phụ huynh
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Đăng ký thành công',
            'user' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json([
                'success' => true,
                'user' => $user,
                'token' => $user->createToken('auth_token')->plainTextToken ?? null,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Sai email hoặc mật khẩu'
        ], 401);
    }

    public function me(Request $request)
    {
        if (Auth::check()) {
            return response()->json([
                'success' => true,
                'user' => Auth::user(),
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Chưa đăng nhập'
        ], 401);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['success' => true]);
    }
}