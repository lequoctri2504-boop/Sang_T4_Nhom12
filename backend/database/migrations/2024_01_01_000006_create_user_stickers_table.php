<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_stickers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('sticker_id')->constrained('stickers')->onDelete('cascade');
            // Lưu: bé nào đã mở khóa sticker nào
            $table->timestamp('unlocked_at')->useCurrent(); // Ngày mở khóa
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_stickers');
    }
};
