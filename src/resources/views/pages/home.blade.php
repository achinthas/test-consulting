@extends('master')

{{--ToDo: Handling the multilingual --}}
@section('title', 'Success Consultants')
@section('og:image', asset('images/logo.png'))
@section('og:description', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida sit amet lacus eu sollicitudin. Cras finibus tellus nec justo congue lobortis.')
@section('og:title', 'Success Consulting')
@section('og:url', url()->current())

@section('content')
    {{--Start of the Slider--}}
    <section id="sc-slider">

        <div id="sc-slider-main" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#sc-slider-main" data-slide-to="0" class="active"></li>
                <li data-target="#sc-slider-main" data-slide-to="1"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="first-slide" src="{{ asset('images/slider/slide1.jpg') }}" alt="Meeting with business consultants">
                </div>
                <div class="carousel-item">
                    <img class="first-slide" src="{{ asset('images/slider/slide2.jpg') }}" alt="Jump start your business">
                </div>
            </div>
            <a class="carousel-control-prev" href="#sc-slider-main" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#sc-slider-main" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>

    </section>
    {{--End of the slider--}}

    {{--Start of the section1--}}
    <section class="sc-section sc-section-welcome container">

        <div class="row">

            <div class="col-lg-12">
                <h1 class="text-center sc-heading-separator">Transform your business to the next level.</h1>
            </div>

        </div>

        <div class="row">

            <div class="col-lg-4">
                <div class="sc-home-feature-box">
                    <img class="sc-home-feature-box-img" src="{{ asset('images/your-success.jpg') }}" alt="Your Success">
                    <h3>Your Success</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a turpis commodo, gravida lacus eget, egestas tellus. Duis tellus nisl, luctus eget auctor at, commodo at lacus. Nam quis dolor sit amet odio ornare fringilla.</p>
                    <p><a class="btn btn-secondary sc-btn" href="#" role="button">View details &raquo;</a></p>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="sc-home-feature-box">
                    <img class="sc-home-feature-box-img" src="{{ asset('images/our-team.jpg') }}" alt="Our Team">
                    <h3>Our Team</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a turpis commodo, gravida lacus eget, egestas tellus. Duis tellus nisl, luctus eget auctor at, commodo at lacus. Nam quis dolor sit amet odio ornare fringilla.</p>
                    <p><a class="btn sc-btn" href="#" role="button">View details &raquo;</a></p>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="sc-home-feature-box">
                    <img class="sc-home-feature-box-img" src="{{ asset('images/our-solutions.jpg') }}" alt="Our Solutions">
                    <h3>Our Solutions</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a turpis commodo, gravida lacus eget, egestas tellus. Duis tellus nisl, luctus eget auctor at, commodo at lacus. Nam quis dolor sit amet odio ornare fringilla.</p>
                    <p><a class="btn sc-btn" href="#" role="button">View details &raquo;</a></p>
                </div>
            </div>

        </div>

    </section>
    {{--End of the section1--}}

    {{--Start of the section2--}}
    <section class="sc-section sc-section-dark sc-section-industry">
        <div class="container">
            <div class="row">

                <div class="col-lg-12">
                    <h2 class="text-center sc-heading-separator">Select your industry to get started.</h2>
                </div>

            </div>

            <div class="row justify-content-center">

                <div class="col-12 col-md-6 col-lg-4">
                   <select class="custom-select" onchange="if (this.value) window.location.href='{{ url('industry') }}/' + this.value">
                       <option selected value="">Please select</option>
                       @foreach ($industries as $industry)
                           <option value="{{ $industry->slug }}">{{ $industry->name }}</option>
                       @endforeach
                   </select>
                </div>

            </div>
        </div>
    </section>
    {{--End of the section2--}}
@endsection