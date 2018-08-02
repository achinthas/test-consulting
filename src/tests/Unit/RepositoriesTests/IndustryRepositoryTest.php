<?php

namespace Tests\Unit\RepositoriesTests;

use Mockery;
use App\Industry;
use Tests\TestCase;
use Illuminate\Support\Facades\Cache;
use App\Repositories\IndustryRepository;

class IndustryRepositoryTest extends TestCase
{

    protected $industries;
    protected $industryMock;

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

        $this->industryMock = Mockery::mock(Industry::class);
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

        $industryRepository = new IndustryRepository();
        $all = $industryRepository->all();

        $this->assertContains( $this->industries[2], $all);
    }

    public function testGetAllFromDatabase()
    {
        $industry = new Industry();

        Cache::shouldReceive('has')
            ->once()
            ->with('industries.all')
            ->andReturn(false);

        Cache::shouldReceive('put')
            ->once()
            ->with('industries.all', $industry->newCollection($this->industries), 0)
            ->andReturn(true);

        $this->industryMock
            ->shouldReceive('all')
            ->once()
            ->andReturn(array_reverse($this->industries));

        $this->app->instance(Industry::class, $this->industryMock);

        $industryRepository = new IndustryRepository();
        $all = $industryRepository->all();
        dd($all);
        $this->assertContains( $this->industries[2], $all);
    }
}