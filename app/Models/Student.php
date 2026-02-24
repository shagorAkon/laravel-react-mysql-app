<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'name',
        'email',
        'phone',
        'date_of_birth',
        'gender',
        'address',
        'school_name',
        'class_id',
        'batch_id',
        'status',
        'admission_date',
        'monthly_fee',
        'photo'
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'admission_date' => 'date',
        'monthly_fee' => 'decimal:2'
    ];

    public function coachingClass()
    {
        return $this->belongsTo(CoachingClass::class, 'class_id');
    }

    public function batch()
    {
        return $this->belongsTo(Batch::class);
    }

    public function parents()
    {
        return $this->hasMany(ParentGuardian::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function attendance()
    {
        return $this->hasMany(Attendance::class);
    }

    public function primaryParent()
    {
        return $this->hasOne(ParentGuardian::class)->where('is_primary', true);
    }

    public function isApproved()
    {
        return $this->status === 'approved' || $this->status === 'active';
    }
}