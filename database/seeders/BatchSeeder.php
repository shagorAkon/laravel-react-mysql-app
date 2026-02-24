<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Batch;
use App\Models\CoachingClass;

class BatchSeeder extends Seeder
{
    public function run()
    {
        $classes = CoachingClass::all();
        
        $timeSlots = [
            ['start' => '07:00', 'end' => '08:30', 'name' => 'Morning Batch A'],
            ['start' => '08:45', 'end' => '10:15', 'name' => 'Morning Batch B'],
            ['start' => '10:30', 'end' => '12:00', 'name' => 'Morning Batch C'],
            ['start' => '14:00', 'end' => '15:30', 'name' => 'Afternoon Batch A'],
            ['start' => '15:45', 'end' => '17:15', 'name' => 'Afternoon Batch B'],
            ['start' => '17:30', 'end' => '19:00', 'name' => 'Evening Batch A'],
            ['start' => '19:15', 'end' => '20:45', 'name' => 'Evening Batch B'],
            ['start' => '21:00', 'end' => '22:30', 'name' => 'Night Batch'],
        ];

        foreach ($classes as $class) {
            // Create 2-3 batches per class
            $batchCount = rand(2, 3);
            $selectedSlots = array_rand($timeSlots, $batchCount);
            
            if (!is_array($selectedSlots)) {
                $selectedSlots = [$selectedSlots];
            }
            
            foreach ($selectedSlots as $slotIndex) {
                $slot = $timeSlots[$slotIndex];
                
                Batch::create([
                    'name' => $class->display_name . ' - ' . $slot['name'],
                    'class_id' => $class->id,
                    'start_time' => $slot['start'],
                    'end_time' => $slot['end'],
                    'days' => ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'], // 5 days a week
                    'max_students' => 25,
                    'current_students' => 0,
                    'is_active' => true
                ]);
            }
        }
    }
}