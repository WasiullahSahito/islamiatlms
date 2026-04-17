<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Alter default users table to add role
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('student'); // 'student' or 'instructor'
        });

        // Enrollments & Payments
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('course_id'); // 'igcse' or 'olevel'
            $table->decimal('amount', 8, 2);
            $table->string('payment_method'); // 'creditcard', 'bank', 'mezan', 'easypaisa', 'jazzcash'
            $table->string('payment_status')->default('pending'); // 'pending', 'completed', 'failed'
            $table->string('proof_of_payment')->nullable(); // For EasyPaisa/JazzCash
            $table->string('stripe_transaction_id')->nullable(); // For Stripe (Card/Bank)
            $table->timestamps();
        });

        // Instructor Uploads: Materials
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('course_id');
            $table->string('type'); // 'Notes', 'Past Papers', 'Rubrics'
            $table->string('file_path');
            $table->timestamps();
        });

        // Instructor Uploads: Lectures
        Schema::create('lectures', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('course_id');
            $table->string('link');
            $table->timestamps();
        });

        // Tests
        Schema::create('tests', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('course_id');
            $table->date('available_from');
            $table->timestamps();
        });

        // Test Questions
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('test_id')->constrained('tests')->onDelete('cascade');
            $table->text('q_text');
            $table->json('options'); // JSON array of 4 options
            $table->integer('correct_option'); // Index 0-3
            $table->timestamps();
        });

        // Student Test Scores
        Schema::create('test_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('test_id')->constrained('tests')->onDelete('cascade');
            $table->integer('score'); // Percentage
            $table->string('raw_score'); // e.g. "8/10"
            $table->timestamps();
        });

        // Contact Messages
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('course')->nullable();
            $table->boolean('demo_class')->default(false);
            $table->text('message');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('test_scores');
        Schema::dropIfExists('questions');
        Schema::dropIfExists('tests');
        Schema::dropIfExists('lectures');
        Schema::dropIfExists('materials');
        Schema::dropIfExists('enrollments');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
};
