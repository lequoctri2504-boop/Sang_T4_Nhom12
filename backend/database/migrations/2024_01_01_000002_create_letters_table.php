<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('letters', function (Blueprint $table) {
            $table->id();
            $table->string('name');                        // Tên chữ: "A", "Ă", "B"...
            $table->string('image')->nullable();           // Hình chữ: "images/a.png"
            $table->string('audio')->nullable();           // Tiếng đọc: "audio/a.mp3"
            $table->string('example_word')->nullable();    // Từ ví dụ: "Áo", "Bướm"
            $table->string('example_image')->nullable();   // Hình từ ví dụ
            $table->integer('sort_order')->default(0);     // Thứ tự hiển thị: 1→29
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('letters');
    }
};
