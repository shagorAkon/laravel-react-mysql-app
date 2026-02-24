<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        $superAdminRole = Role::where('name', 'super_admin')->first();
        $adminRole = Role::where('name', 'admin')->first();

        // Create Super Admin (Rs Rana Sohel - Owner)
        User::create([
            'name' => 'Rs Rana Sohel',
            'email' => 'rana@knowwithrana.com',
            'password' => Hash::make('password123'),
            'role_id' => $superAdminRole->id,
            'phone' => '+8801700000000',
            'is_active' => true,
            'email_verified_at' => now()
        ]);

        // Create Admin Users
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@knowwithrana.com',
            'password' => Hash::make('admin123'),
            'role_id' => $adminRole->id,
            'phone' => '+8801700000001',
            'is_active' => true,
            'email_verified_at' => now()
        ]);
    }
}