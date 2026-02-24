<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Check if user is approved
        if (!$user->isApproved()) {
            $message = 'Your account is pending approval.';
            if ($user->isRejected()) {
                $message = 'Your account has been rejected. ' . ($user->rejection_reason ?? 'Please contact administrator for more information.');
            }
            return response()->json([
                'message' => $message,
                'status' => $user->approval_status
            ], 403);
        }

        if (!$user->is_active) {
            return response()->json([
                'message' => 'Your account is inactive. Please contact administrator.'
            ], 403);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user->load('role'),
            'token' => $token,
            'message' => 'Login successful'
        ]);
    }

    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'required|string|max:20',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'approval_status' => 'pending',
            'is_active' => false
        ]);

        return response()->json([
            'message' => 'Registration successful! Your account is pending approval. You will be notified once approved.',
            'user' => $user
        ], 201);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user()->load('role')
        ]);
    }
}