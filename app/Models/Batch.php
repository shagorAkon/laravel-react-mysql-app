<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Batch extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'class_id',
        'start_time',
        'end_time',
        'days',
        'max_students',
        'current_students',
        'is_active'
    ];

    protected $casts = [
        'days' => 'array',
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
        'is_active' => 'boolean'
    ];

    public function coachingClass()
    {
        return $this->belongsTo(CoachingClass::class, 'class_id');
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function attendance()
    {
        return $this->hasMany(Attendance::class);
    }

    public function hasAvailableSlots()
    {
        return $this->current_students < $this->max_students;
    }
}