<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('recipient_name');
            $table->string('email')->nullable();
            $table->string('webinar_title', 500);
            $table->date('webinar_date');
            $table->string('speaker_name');
            $table->string('speaker_signature_path')->nullable();
            $table->string('speaker_role');
            $table->string('coordinator_name');
            $table->string('coordinator_signature_path')->nullable();
            $table->string('coordinator_role');
            $table->foreignId('issued_by')
                  ->constrained('users')
                  ->cascadeOnDelete();
            $table->timestamps();

            $table->index('uuid');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
