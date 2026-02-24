<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Payment;
use App\Models\CoachingClass;
use App\Models\Batch;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function stats(): JsonResponse
    {
        $totalStudents = Student::where('status', 'approved')->count();
        $pendingApplications = Student::where('status', 'pending')->count();
        $totalClasses = CoachingClass::where('is_active', true)->count();
        $totalBatches = Batch::where('is_active', true)->count();
        
        // Monthly revenue calculation
        $currentMonth = Carbon::now()->format('Y-m');
        $monthlyRevenue = Payment::where('month_year', $currentMonth)
                                ->where('status', 'paid')
                                ->sum('amount');
        
        // Pending payments
        $pendingPayments = Payment::where('status', 'pending')->count();
        $overduePayments = Payment::where('status', 'overdue')
                                 ->orWhere(function($query) {
                                     $query->where('status', 'pending')
                                           ->where('due_date', '<', now());
                                 })->count();

        // Recent activities
        $recentStudents = Student::with(['coachingClass', 'batch'])
                                ->where('status', 'pending')
                                ->orderBy('created_at', 'desc')
                                ->limit(5)
                                ->get();

        return response()->json([
            'stats' => [
                'total_students' => $totalStudents,
                'pending_applications' => $pendingApplications,
                'total_classes' => $totalClasses,
                'total_batches' => $totalBatches,
                'monthly_revenue' => $monthlyRevenue,
                'pending_payments' => $pendingPayments,
                'overdue_payments' => $overduePayments
            ],
            'recent_students' => $recentStudents,
            'coaching_info' => [
                'name' => 'Know With Rana',
                'owner' => 'Rs Rana Sohel',
                'established' => '2010',
                'location' => 'Dogree Bazar, Naria, Shariatpur',
                'student_range' => '70-120',
                'fee_range' => '700-8000 BDT',
                'monthly_income' => '1.5 Lakh BDT'
            ]
        ]);
    }

    public function studentDashboard(Request $request): JsonResponse
    {
        $user = $request->user();
        
        // For now, we'll simulate student data
        // In a real implementation, you'd link users to students
        
        return response()->json([
            'message' => 'Student dashboard data',
            'user' => $user->load('role'),
            'notices' => [
                [
                    'title' => 'Welcome to Know With Rana',
                    'message' => 'Welcome to our coaching center management system.',
                    'date' => now()->format('Y-m-d')
                ]
            ]
        ]);
    }

    public function parentDashboard(Request $request): JsonResponse
    {
        $user = $request->user();
        
        return response()->json([
            'message' => 'Parent dashboard data',
            'user' => $user->load('role'),
            'children' => [], // Will be populated when parent-student linking is implemented
            'notices' => [
                [
                    'title' => 'Parent Portal Access',
                    'message' => 'You can now track your child\'s progress through this portal.',
                    'date' => now()->format('Y-m-d')
                ]
            ]
        ]);
    }
}