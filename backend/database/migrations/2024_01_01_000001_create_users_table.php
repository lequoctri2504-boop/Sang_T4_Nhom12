<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');                                        // Tên: "Mẹ Lan"
            $table->string('email')->unique();                             // Email đăng nhập
            $table->string('password');                                    // Mật khẩu (mã hóa)
            $table->enum('role', ['admin', 'parent'])->default('parent'); // Vai trò
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
