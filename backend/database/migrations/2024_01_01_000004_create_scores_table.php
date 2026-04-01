<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            // Nullable vì bé chơi không cần đăng nhập
            $table->string('player_name')->default('Bé'); // Tên bé nhập ở màn hình chào
            $table->integer('correct')->default(0);        // Số câu đúng
            $table->integer('total')->default(0);          // Tổng số câu
            $table->integer('stars')->default(0);          // Số sao nhận được: 0, 1, 2, 3
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scores');
    }
};
