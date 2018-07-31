<?php

namespace App\Http\Controllers;

use App\Interfaces\IndustryRepositoryInterface;

class HomeController extends Controller
{

    /**
     * GET / Serve the home page
     * @param IndustryRepositoryInterface $industryRepository
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(IndustryRepositoryInterface $industryRepository)
    {
        return view('pages.home', [
            'industries' => $industryRepository->all()
        ]);
    }
}
