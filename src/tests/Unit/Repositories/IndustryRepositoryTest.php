<?php

namespace Tests\Unit\Repositories;

use Mockery;
use Tests\TestCase;
use Illuminate\Support\Facades\Cache;
use App\Repositories\IndustryRepository;

class IndustryRepositoryTest extends TestCase
{

    protected $industries;

    public function setUp()
    {
        parent::setUp();

        $this->industries = [
            [
                "id" => 1,
                "name" => "Defence",
                "slug" => "defence",
            ],
            [
                "id" => 2,
                "name" => "Education Services",
                "slug" => "education-services",
            ],
            [
                "id" => 3,
                "name" => "Energy",
                "slug" => "energy",
            ]
        ];
    }

    public function testGetAllFromCache()
    {
        Cache::shouldReceive('has')
            ->once()
            ->with('industries.all')
            ->andReturn(true);

        Cache::shouldReceive('get')
            ->once()
            ->with('industries.all')
            ->andReturn($this->industries);

        $model = Mockery::mock('App\Industry');
        $industryRepository = new IndustryRepository($model);
        $all = $industryRepository->all();

        $this->assertContains($this->industries[2], $all);
    }


    public function testGetAllFromDatabase()
    {
        Cache::shouldReceive('has')
            ->once()
            ->with('industries.all')
            ->andReturn(false);

        Cache::shouldReceive('put')
            ->with('industries.all', \Mockery::any(), \Mockery::any())
            ->andReturn(true);

        $model = Mockery::mock('App\Industry[all]');
        $model->shouldReceive('all')->once()->andReturn($this->industries);
        $industryRepository = new IndustryRepository($model);

        $all = $industryRepository->all();

        $this->assertContains($this->industries[2], $all);
    }
}
