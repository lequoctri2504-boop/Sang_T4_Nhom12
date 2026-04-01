<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // public function up(): void
    // {
    //     Schema::create('alphabets', function (Blueprint $table) {
    //         $table->id();
    //         $table->timestamps();
    //     });
    // }
    public function up(): void
{
    Schema::create('alphabets', function (Blueprint $table) {
        // $table->id();
        // $table->string('chu_cai');      // Ví dụ: A, Ă, Â
        // $table->string('hinh_anh');     // Link ảnh con vật minh họa
        // $table->string('am_thanh');     // Link file mp3 đọc chữ
        // $table->string('tu_minh_hoa');  // Ví dụ: Con Cá
        // $table->timestamps();
        $table->id();
        $table->string('letter');        // Chữ cái: A, Ă, Â...
        $table->string('image_url');     // Đường dẫn ảnh (táo, cá,...)
        $table->string('audio_url');     // Đường dẫn file âm thanh đọc chữ
        $table->string('description');   // Ví dụ: "A - Quả táo"
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alphabets');
    }
};
