<?php

namespace Tests\Unit\Repositories;

use Mockery;
use Tests\TestCase;
use App\Interfaces\IndustryRepositoryInterface;

class HomeControllerTest extends TestCase
{

    protected $industries;
    protected $industryMock;

    /**
     * Testing the GET home page
     */
    public function testGetIndex()
    {
        /* Mocking the Repository */
        $repository = Mockery::mock(IndustryRepositoryInterface::class);
        $repository->shouldReceive('all')
            ->once()
            ->andReturn([]);
        $this->app->instance(IndustryRepositoryInterface::class, $repository);

        $response = $this->get('/');
        $response->assertOk();
    }
}
