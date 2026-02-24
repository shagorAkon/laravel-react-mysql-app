<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\UserApprovalController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Test route
Route::get('/test', function () {
    return response()->json([
        'message' => 'Know With Rana - Coaching Center Management System API',
        'timestamp' => now(),
        'status' => 'success'
    ]);
});

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/applications', [ApplicationController::class, 'store']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Dashboard routes
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('/dashboard/student', [DashboardController::class, 'studentDashboard']);
    Route::get('/dashboard/parent', [DashboardController::class, 'parentDashboard']);
    
    // Application management routes (Admin/Super Admin only)
    Route::apiResource('applications', ApplicationController::class)->except(['store']);
    Route::post('/applications/{application}/approve', [ApplicationController::class, 'approve']);
    Route::post('/applications/{application}/reject', [ApplicationController::class, 'reject']);
    
    // User approval routes (Super Admin only)
    Route::get('/users/pending', [UserApprovalController::class, 'pendingUsers']);
    Route::post('/users/{user}/approve', [UserApprovalController::class, 'approve']);
    Route::post('/users/{user}/reject', [UserApprovalController::class, 'reject']);
    Route::post('/users/{user}/assign-role', [UserApprovalController::class, 'assignRole']);
    
    // Student management routes
    Route::apiResource('students', StudentController::class);
    Route::post('/students/{student}/approve', [StudentController::class, 'approve']);
    Route::post('/students/{student}/reject', [StudentController::class, 'reject']);
    
    // User routes
    Route::apiResource('users', UserController::class);
    
    // Get current user
    Route::get('/user', function (Request $request) {
        return $request->user()->load('role');
    });
});
