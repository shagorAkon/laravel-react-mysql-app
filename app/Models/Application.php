<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'application_type',
        'full_name',
        'email',
        'phone',
        'date_of_birth',
        'gender',
        'address',
        'school_name',
        'class_id',
        'batch_id',
        'guardian_name',
        'guardian_email',
        'guardian_phone',
        'guardian_relation',
        'student_id',
        'status',
        'approved_by',
        'approved_at',
        'rejection_reason',
        'additional_data'
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'approved_at' => 'datetime',
        'additional_data' => 'array'
    ];

    public function coachingClass()
    {
        return $this->belongsTo(CoachingClass::class, 'class_id');
    }

    public function batch()
    {
        return $this->belongsTo(Batch::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function isPending()
    {
        return $this->status === 'pending';
    }

    public function isApproved()
    {
        return $this->status === 'approved';
    }

    public function isRejected()
    {
        return $this->status === 'rejected';
    }
}
