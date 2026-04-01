<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stickers', function (Blueprint $table) {
            $table->id();
            $table->string('name');                        // Tên sticker: "Quả Táo"
            $table->string('icon');                        // Emoji: "🍎"
            $table->integer('stars_required')->default(0); // Số sao cần để mở khóa
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stickers');
    }
};
