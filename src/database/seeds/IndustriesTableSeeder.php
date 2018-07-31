<?php

use Illuminate\Database\Seeder;

class IndustriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds for industries table.
     * @return void
     */
    public function run()
    {
        DB::table('industries')->insert([
            [
                'name' => 'Defence',
                'slug' => 'defence'
            ],
            [
                'name' => 'Education Services',
                'slug' => 'education-services'
            ],
            [
                'name' => 'Energy',
                'slug' => 'energy'
            ],
            [
                'name' => 'Environment and Food',
                'slug' => 'environment-and-food'
            ],
            [
                'name' => 'Heritage',
                'slug' => 'heritage'
            ],
            [
                'name' => 'IT & Telecoms',
                'slug' => 'it-telecoms'
            ],
            [
                'name' => 'Justice',
                'slug' => 'justice'
            ],
            [
                'name' => 'Media and Entertainment',
                'slug' => 'media-and-entertainment'
            ],
            [
                'name' => 'Nuclear',
                'slug' => 'nuclear'
            ],
            [
                'name' => 'Public Service',
                'slug' => 'public-service'
            ],
            [
                'name' => 'Science',
                'slug' => 'science'
            ],
            [
                'name' => 'Sport',
                'slug' => 'sport'
            ],
            [
                'name' => 'Transport',
                'slug' => 'transport'
            ]
        ]);
    }
}
