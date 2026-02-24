<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $table = 'attendance';

    protected $fillable = [
        'student_id',
        'batch_id',
        'date',
        'status',
        'check_in_time',
        'notes'
    ];

    protected $casts = [
        'date' => 'date',
        'check_in_time' => 'datetime:H:i'
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function batch()
    {
        return $this->belongsTo(Batch::class);
    }

    public function isPresent()
    {
        return $this->status === 'present';
    }
}