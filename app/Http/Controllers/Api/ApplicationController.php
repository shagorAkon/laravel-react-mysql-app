<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\User;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ApplicationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Application::with(['coachingClass', 'batch', 'student', 'approver']);

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by type
        if ($request->has('type')) {
            $query->where('application_type', $request->type);
        }

        $applications = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json($applications);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'application_type' => 'required|in:student,guardian',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:applications',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
        ]);

        $data = $request->all();

        // Additional validation based on type
        if ($request->application_type === 'student') {
            $request->validate([
                'date_of_birth' => 'required|date',
                'gender' => 'required|in:male,female,other',
                'class_id' => 'required|exists:classes,id',
                'batch_id' => 'required|exists:batches,id',
                'guardian_name' => 'required|string|max:255',
                'guardian_email' => 'required|email',
                'guardian_phone' => 'required|string|max:20',
                'guardian_relation' => 'required|in:father,mother,guardian',
            ]);
        } elseif ($request->application_type === 'guardian') {
            $request->validate([
                'student_id' => 'required|exists:students,id',
            ]);
        }

        $application = Application::create($data);

        return response()->json([
            'message' => 'Application submitted successfully! You will be notified once reviewed.',
            'application' => $application->load(['coachingClass', 'batch'])
        ], 201);
    }

    public function show(Application $application): JsonResponse
    {
        return response()->json([
            'application' => $application->load(['coachingClass', 'batch', 'student', 'approver'])
        ]);
    }

    public function approve(Request $request, Application $application): JsonResponse
    {
        if ($application->status !== 'pending') {
            return response()->json([
                'message' => 'Application is not in pending status'
            ], 422);
        }

        $request->validate([
            'role_id' => 'required|exists:roles,id'
        ]);

        // Create user account
        $password = Str::random(10);
        
        $user = User::create([
            'name' => $application->full_name,
            'email' => $application->email,
            'password' => Hash::make($password),
            'phone' => $application->phone,
            'role_id' => $request->role_id,
            'approval_status' => 'approved',
            'approved_by' => $request->user()->id,
            'approved_at' => now(),
            'is_active' => true
        ]);

        // If student application, create student record
        if ($application->application_type === 'student') {
            $studentId = 'KWR' . date('Y') . str_pad(Student::count() + 1, 4, '0', STR_PAD_LEFT);
            
            $student = Student::create([
                'student_id' => $studentId,
                'name' => $application->full_name,
                'email' => $application->email,
                'phone' => $application->phone,
                'date_of_birth' => $application->date_of_birth,
                'gender' => $application->gender,
                'address' => $application->address,
                'school_name' => $application->school_name,
                'class_id' => $application->class_id,
                'batch_id' => $application->batch_id,
                'monthly_fee' => $application->coachingClass->monthly_fee,
                'status' => 'approved',
                'admission_date' => now()
            ]);

            // Create parent record
            $student->parents()->create([
                'name' => $application->guardian_name,
                'email' => $application->guardian_email,
                'phone' => $application->guardian_phone,
                'relation' => $application->guardian_relation,
                'address' => $application->address,
                'is_primary' => true
            ]);

            // Update batch count
            $application->batch->increment('current_students');
        }

        // Update application
        $application->update([
            'status' => 'approved',
            'approved_by' => $request->user()->id,
            'approved_at' => now()
        ]);

        // TODO: Send email with credentials

        return response()->json([
            'message' => 'Application approved successfully',
            'application' => $application->load(['coachingClass', 'batch']),
            'user' => $user->load('role'),
            'temporary_password' => $password
        ]);
    }

    public function reject(Request $request, Application $application): JsonResponse
    {
        if ($application->status !== 'pending') {
            return response()->json([
                'message' => 'Application is not in pending status'
            ], 422);
        }

        $request->validate([
            'rejection_reason' => 'required|string'
        ]);

        $application->update([
            'status' => 'rejected',
            'approved_by' => $request->user()->id,
            'approved_at' => now(),
            'rejection_reason' => $request->rejection_reason
        ]);

        // TODO: Send rejection email

        return response()->json([
            'message' => 'Application rejected',
            'application' => $application
        ]);
    }

    public function destroy(Application $application): JsonResponse
    {
        $application->delete();

        return response()->json([
            'message' => 'Application deleted successfully'
        ]);
    }
}
