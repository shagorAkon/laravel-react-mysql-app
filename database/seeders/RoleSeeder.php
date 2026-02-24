<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            [
                'name' => 'super_admin',
                'display_name' => 'Super Administrator',
                'description' => 'Full system access with all permissions',
                'permissions' => [
                    'manage_users',
                    'manage_roles',
                    'manage_students',
                    'manage_classes',
                    'manage_batches',
                    'manage_payments',
                    'manage_attendance',
                    'view_reports',
                    'manage_notices',
                    'system_settings'
                ]
            ],
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'Administrative access with limited permissions',
                'permissions' => [
                    'manage_students',
                    'manage_classes',
                    'manage_batches',
                    'manage_payments',
                    'manage_attendance',
                    'view_reports',
                    'manage_notices'
                ]
            ],
            [
                'name' => 'teacher',
                'display_name' => 'Teacher',
                'description' => 'Teacher access for attendance and student management',
                'permissions' => [
                    'view_students',
                    'manage_attendance',
                    'view_reports'
                ]
            ],
            [
                'name' => 'student',
                'display_name' => 'Student',
                'description' => 'Student access to view their information',
                'permissions' => [
                    'view_profile',
                    'view_attendance',
                    'view_payments',
                    'view_notices'
                ]
            ],
            [
                'name' => 'parent',
                'display_name' => 'Parent/Guardian',
                'description' => 'Parent access to view their child information',
                'permissions' => [
                    'view_child_profile',
                    'view_child_attendance',
                    'view_child_payments',
                    'view_notices'
                ]
            ]
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}