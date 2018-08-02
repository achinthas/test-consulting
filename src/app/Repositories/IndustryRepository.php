<?php
namespace App\Repositories;

use App\Industry;
use App\Interfaces\IndustryRepositoryInterface;
use \Cache;

class IndustryRepository extends Repository implements IndustryRepositoryInterface
{

    /**
     * Get all the industries. This data will be cached for default caching period.
     * @param bool $cache Should retrieve cached data?
     * @return Industry[]|\Illuminate\Database\Eloquent\Collection
     */
    public function all($cache = true)
    {

        if (Cache::has('industries.all') && $cache) {
            $industries = Cache::get('industries.all');
        } else {
            $industries =  Industry::all();

            /*
             * ToDo: Enable tags on caching in redis or Memcached. The database and file cache drivers
             * are not supporting for tagging.
             */
            //Cache::tags(['industries'])->put('industries.all', $industries, config('cache.expire'));

            Cache::put('industries.all', $industries, config('cache.expire'));
        }
        //dd($industries);
        return $industries;
    }
}
