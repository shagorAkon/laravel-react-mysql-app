<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CoachingClass;

class ClassSeeder extends Seeder
{
    public function run()
    {
        $classes = [
            ['name' => 'class_6', 'display_name' => 'Class 6', 'description' => 'Sixth grade students', 'monthly_fee' => 700.00],
            ['name' => 'class_7', 'display_name' => 'Class 7', 'description' => 'Seventh grade students', 'monthly_fee' => 800.00],
            ['name' => 'class_8', 'display_name' => 'Class 8', 'description' => 'Eighth grade students', 'monthly_fee' => 1000.00],
            ['name' => 'class_9', 'display_name' => 'Class 9', 'description' => 'Ninth grade students', 'monthly_fee' => 1500.00],
            ['name' => 'class_10', 'display_name' => 'Class 10', 'description' => 'Tenth grade students (SSC)', 'monthly_fee' => 2000.00],
            ['name' => 'class_11', 'display_name' => 'Class 11', 'description' => 'Eleventh grade students (HSC)', 'monthly_fee' => 3000.00],
            ['name' => 'class_12', 'display_name' => 'Class 12', 'description' => 'Twelfth grade students (HSC)', 'monthly_fee' => 3500.00],
        ];

        foreach ($classes as $class) {
            CoachingClass::create($class);
        }
    }
}