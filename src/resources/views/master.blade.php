<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    {{--Metatags to handle encoding and screen--}}
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    {{--StyleSheets--}}
    <link href="//fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link rel="stylesheet" href="//stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="//use.fontawesome.com/releases/v5.2.0/css/brands.css">
    <link rel="stylesheet" href="//use.fontawesome.com/releases/v5.2.0/css/fontawesome.css">
    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">

    <title>@yield('title')</title>

    {{--OpenGraph Metatags for Facebook--}}
    <meta property="og:image" content="@yield('og:image')">
    <meta property="og:description" content="@yield('og:description')">
    <meta property="og:title" content="@yield('og:title')">
    <meta property="og:url" content="@yield('og:url')">
</head>
<body>

    @include('partials.header')

    <main role="main">
        @yield('content')
    </main>

    @include('partials.footer')

    <script src="{{ mix('/js/vendor.js') }}"></script>
    {{-- ToDo: Enable this when we custom JS --}}
    {{--<script global="{{ mix('/js/app.js') }}"></script>--}}

</body>
</html>