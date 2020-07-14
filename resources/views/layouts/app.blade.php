<!DOCTYPE html>
<html lang={{ config('app.locale') }}>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ trans('navigation.main_title') }}</title>
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <script src="{{ mix('js/app.js') }}" defer></script>
</head>
<body>
    <header class="header_area">
        @include('layouts.menu')
    </header>
    @include('layouts.cart')
    @yield('content')
    @include('layouts.footer')
</body>
</html>
