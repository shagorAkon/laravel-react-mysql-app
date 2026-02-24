<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('payment_id')->unique();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 8, 2);
            $table->string('month_year'); // 2025-01
            $table->enum('status', ['pending', 'paid', 'overdue', 'partial'])->default('pending');
            $table->enum('payment_method', ['cash', 'bank_transfer', 'mobile_banking', 'card'])->nullable();
            $table->date('due_date');
            $table->date('paid_date')->nullable();
            $table->text('notes')->nullable();
            $table->string('receipt_number')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
}