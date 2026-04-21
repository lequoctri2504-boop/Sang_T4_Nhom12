<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('letter_id')->constrained('letters')->onDelete('cascade');
            // Xóa chữ cái → tự xóa câu quiz theo
            $table->enum('type', ['visual', 'audio'])->default('visual');
            // visual = nhìn hình chọn chữ | audio = nghe âm chọn chữ
            $table->string('question');   // Câu hỏi: "Bé tìm chữ A nào!"
            $table->json('options');      // 4 đáp án: ["A","B","C","D"]
            $table->string('answer');     // Đáp án đúng: "A"
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};
