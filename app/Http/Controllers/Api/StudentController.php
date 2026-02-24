<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\CoachingClass;
use App\Models\Batch;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class StudentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Student::with(['coachingClass', 'batch', 'primaryParent']);

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by class
        if ($request->has('class_id')) {
            $query->where('class_id', $request->class_id);
        }

        // Search by name or student ID
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('student_id', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $students = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json($students);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students',
            'phone' => 'required|string|max:20',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'address' => 'required|string',
            'school_name' => 'nullable|string|max:255',
            'class_id' => 'required|exists:classes,id',
            'batch_id' => 'required|exists:batches,id',
            'parent_name' => 'required|string|max:255',
            'parent_email' => 'required|email',
            'parent_phone' => 'required|string|max:20',
            'parent_relation' => 'required|in:father,mother,guardian',
        ]);

        // Check if batch has available slots
        $batch = Batch::find($request->batch_id);
        if (!$batch->hasAvailableSlots()) {
            return response()->json([
                'message' => 'Selected batch is full. Please choose another batch.'
            ], 422);
        }

        // Generate unique student ID
        $studentId = 'KWR' . date('Y') . str_pad(Student::count() + 1, 4, '0', STR_PAD_LEFT);

        // Get class fee
        $class = CoachingClass::find($request->class_id);

        $student = Student::create([
            'student_id' => $studentId,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
            'address' => $request->address,
            'school_name' => $request->school_name,
            'class_id' => $request->class_id,
            'batch_id' => $request->batch_id,
            'monthly_fee' => $class->monthly_fee,
            'status' => 'pending'
        ]);

        // Create parent record
        $student->parents()->create([
            'name' => $request->parent_name,
            'email' => $request->parent_email,
            'phone' => $request->parent_phone,
            'relation' => $request->parent_relation,
            'address' => $request->address,
            'is_primary' => true
        ]);

        return response()->json([
            'message' => 'Student application submitted successfully',
            'student' => $student->load(['coachingClass', 'batch', 'primaryParent'])
        ], 201);
    }

    public function show(Student $student): JsonResponse
    {
        return response()->json([
            'student' => $student->load(['coachingClass', 'batch', 'parents', 'payments', 'attendance'])
        ]);
    }

    public function approve(Student $student): JsonResponse
    {
        if ($student->status !== 'pending') {
            return response()->json([
                'message' => 'Student is not in pending status'
            ], 422);
        }

        $student->update([
            'status' => 'approved',
            'admission_date' => now()
        ]);

        // Update batch current students count
        $student->batch->increment('current_students');

        return response()->json([
            'message' => 'Student approved successfully',
            'student' => $student->load(['coachingClass', 'batch'])
        ]);
    }

    public function reject(Student $student): JsonResponse
    {
        if ($student->status !== 'pending') {
            return response()->json([
                'message' => 'Student is not in pending status'
            ], 422);
        }

        $student->update(['status' => 'rejected']);

        return response()->json([
            'message' => 'Student application rejected',
            'student' => $student
        ]);
    }

    public function destroy(Student $student): JsonResponse
    {
        if ($student->status === 'approved' || $student->status === 'active') {
            // Decrease batch current students count
            $student->batch->decrement('current_students');
        }

        $student->delete();

        return response()->json([
            'message' => 'Student deleted successfully'
        ]);
    }
}