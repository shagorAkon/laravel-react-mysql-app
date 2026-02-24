<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserApprovalController extends Controller
{
    public function pendingUsers(): JsonResponse
    {
        $users = User::with('role')
            ->where('approval_status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['users' => $users]);
    }

    public function approve(Request $request, User $user): JsonResponse
    {
        if ($user->approval_status !== 'pending') {
            return response()->json([
                'message' => 'User is not in pending status'
            ], 422);
        }

        $request->validate([
            'role_id' => 'required|exists:roles,id'
        ]);

        $user->update([
            'role_id' => $request->role_id,
            'approval_status' => 'approved',
            'approved_by' => $request->user()->id,
            'approved_at' => now(),
            'is_active' => true
        ]);

        // TODO: Send approval email

        return response()->json([
            'message' => 'User approved successfully',
            'user' => $user->load('role')
        ]);
    }

    public function reject(Request $request, User $user): JsonResponse
    {
        if ($user->approval_status !== 'pending') {
            return response()->json([
                'message' => 'User is not in pending status'
            ], 422);
        }

        $request->validate([
            'rejection_reason' => 'required|string'
        ]);

        $user->update([
            'approval_status' => 'rejected',
            'approved_by' => $request->user()->id,
            'approved_at' => now(),
            'rejection_reason' => $request->rejection_reason,
            'is_active' => false
        ]);

        // TODO: Send rejection email

        return response()->json([
            'message' => 'User rejected',
            'user' => $user
        ]);
    }

    public function assignRole(Request $request, User $user): JsonResponse
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id'
        ]);

        $user->update(['role_id' => $request->role_id]);

        return response()->json([
            'message' => 'Role assigned successfully',
            'user' => $user->load('role')
        ]);
    }
}
