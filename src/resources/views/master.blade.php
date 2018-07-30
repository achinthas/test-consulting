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
    <title>Success Consulting</title>

    {{--OpenGraph Metatags for Facebook--}}
    <meta property="og:image:width" content="136">
    <meta property="og:image:height" content="71">
    <meta property="og:description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida sit amet lacus eu sollicitudin. Cras finibus tellus nec justo congue lobortis.">
    <meta property="og:title" content="Success Consulting">
    <meta property="og:url" content="http://sc.example.com">
    <meta property="og:image" content="http://sc.example.com/images/logo.png/og-image.jpg">
</head>
<body>

    <header id="sc-header">
        <div class="container">
            <nav class="sc-navbar navbar navbar-expand-md navbar-light">

            <a class="sc-navbar-brand navbar-brand" href="{{ url('/') }}">
                <img src="images/logo.png" class="d-inline-block align-top" alt="Success Consulting">
            </a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Projects</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Clients</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Blog</a>
                    </li>

                </ul>
            </div>
        </nav>
        </div>
    </header>

    <main role="main">

        {{--Start of the Slider--}}
        <section id="sc-slider">

            <div id="sc-slider-main" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="first-slide" src="images/slider/slide1.jpg" alt="Meeting with business consultants">
                    </div>
                    <div class="carousel-item">
                        <img class="first-slide" src="images/slider/slide1.jpg" alt="Meeting with business consultants">
                    </div>
                    <div class="carousel-item">
                        <img class="first-slide" src="images/slider/slide1.jpg" alt="Meeting with business consultants">
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
                        <img class="sc-home-feature-box-img" src="images/your-success.jpg" alt="Your Success">
                        <h2>Your Success</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a turpis commodo, gravida lacus eget, egestas tellus. Duis tellus nisl, luctus eget auctor at, commodo at lacus. Nam quis dolor sit amet odio ornare fringilla.</p>
                        <p><a class="btn btn-secondary sc-btn" href="#" role="button">View details &raquo;</a></p>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="sc-home-feature-box">
                        <img class="sc-home-feature-box-img" src="images/our-team.jpg" alt="Our Team">
                        <h2>Our Team</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a turpis commodo, gravida lacus eget, egestas tellus. Duis tellus nisl, luctus eget auctor at, commodo at lacus. Nam quis dolor sit amet odio ornare fringilla.</p>
                        <p><a class="btn sc-btn" href="#" role="button">View details &raquo;</a></p>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="sc-home-feature-box">
                        <img class="sc-home-feature-box-img" src="images/our-solutions.jpg" alt="Our Solutions">
                        <h2>Our Solutions</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a turpis commodo, gravida lacus eget, egestas tellus. Duis tellus nisl, luctus eget auctor at, commodo at lacus. Nam quis dolor sit amet odio ornare fringilla.</p>
                        <p><a class="btn sc-btn" href="#" role="button">View details &raquo;</a></p>
                    </div>
                </div>

            </div>

        </section>
        {{--End of the section1--}}

    </main>

    <footer class="sc-footer">
        <div class="container">

            <div class="row">
                <div class="col-lg-3">
                    <div class="sc-footer-widget">
                        <h4>Success Consulting</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida sit amet lacus eu sollicitudin. Cras finibus tellus nec justo congue lobortis.</p>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="sc-footer-widget sc-footer-menu">
                        <h4>Navigation</h4>
                        <ul class="sc-footer-menu">
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">Services</a>
                            </li>
                            <li>
                                <a href="#">Projects</a>
                            </li>
                            <li>
                                <a href="#">Clients</a>
                            </li>
                            <li>
                                <a href="#">Blog</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="sc-footer-widget sc-footer-menu">
                        <h4>Services</h4>
                        <ul class="sc-footer-menu">
                            <li>
                                <a href="#">Marketing Consultation</a>
                            </li>
                            <li>
                                <a href="#">Law Consultation</a>
                            </li>
                            <li>
                                <a href="#">Accounting Consultation</a>
                            </li>
                            <li>
                                <a href="#">HR Consultation</a>
                            </li>
                            <li>
                                <a href="#">Sales Consultation</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="sc-footer-widget sc-footer-social-buttons">
                        <h4>Find us on</h4>
                        <a href="https://www.facebook.com/facebook/" target="_blank"><i class="fab fa-facebook"></i></a>
                        <a href="https://twitter.com/achinthas" target="_blank"><i class="fab fa-twitter-square"></i></a>
                        <a href="https://plus.google.com/+AchinthaSamindika" target="_blank"><i class="fab fa-google-plus-square"></i></a>
                    </div>
                </div>


            </div>

            <div class="row">
                <div class="col-lg-12">
                    <p class="float-right"><a href="#">Back to top</a></p>
                    <p>&copy; 2018 Success Consulting &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
                </div>
            </div>

        </div>

    </footer>

    {{--<main role="main">


        <!-- Marketing messaging and featurettes
        ================================================== -->
        <!-- Wrap the rest of the page in another container to center all the content. -->

        <div class="container marketing">

            <!-- Three columns of text below the carousel -->
            <div class="row">
                <div class="col-lg-4">
                    <img class="rounded-circle" global="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140">
                    <h2>Heading</h2>
                    <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
                    <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
                </div><!-- /.col-lg-4 -->
                <div class="col-lg-4">
                    <img class="rounded-circle" global="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140">
                    <h2>Heading</h2>
                    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
                    <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
                </div><!-- /.col-lg-4 -->
                <div class="col-lg-4">
                    <img class="rounded-circle" global="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140">
                    <h2>Heading</h2>
                    <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                    <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
                </div><!-- /.col-lg-4 -->
            </div><!-- /.row -->


            <!-- START THE FEATURETTES -->

            <hr class="featurette-divider">

            <div class="row featurette">
                <div class="col-md-7">
                    <h2 class="featurette-heading">First featurette heading. <span class="text-muted">It'll blow your mind.</span></h2>
                    <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                </div>
                <div class="col-md-5">
                    <img class="featurette-image img-fluid mx-auto" data-global="holder.js/500x500/auto" alt="Generic placeholder image">
                </div>
            </div>

            <hr class="featurette-divider">

            <div class="row featurette">
                <div class="col-md-7 order-md-2">
                    <h2 class="featurette-heading">Oh yeah, it's that good. <span class="text-muted">See for yourself.</span></h2>
                    <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                </div>
                <div class="col-md-5 order-md-1">
                    <img class="featurette-image img-fluid mx-auto" data-global="holder.js/500x500/auto" alt="Generic placeholder image">
                </div>
            </div>

            <hr class="featurette-divider">

            <div class="row featurette">
                <div class="col-md-7">
                    <h2 class="featurette-heading">And lastly, this one. <span class="text-muted">Checkmate.</span></h2>
                    <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                </div>
                <div class="col-md-5">
                    <img class="featurette-image img-fluid mx-auto" data-global="holder.js/500x500/auto" alt="Generic placeholder image">
                </div>
            </div>

            <hr class="featurette-divider">

            <!-- /END THE FEATURETTES -->

        </div><!-- /.container -->


        <!-- FOOTER -->
        <footer class="container">
            <p class="float-right"><a href="#">Back to top</a></p>
            <p>&copy; 2017-2018 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
        </footer>
    </main>--}}

    <script src="{{ mix('/js/vendor.js') }}"></script>
    {{--<script global="{{ mix('/js/app.js') }}"></script>--}}


</body>
</html>