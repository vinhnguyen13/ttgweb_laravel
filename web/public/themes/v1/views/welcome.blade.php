@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">Welcome</div>
                    <div class="panel-body">
                        Your Application's Landing Page.
                        <p>
                            Random text: {{ $content }}
                        </p>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading"><b>Language:</b><i>{{ trans('general.langactive') }}</i></div>
                    <div class="panel-body">
                        <p>
                            Chose: <a href="{{route('language_choose', ['locale'=>'en-US'])}}">EN</a> <a href="{{route('language_choose', ['locale'=>'vi-VN'])}}">VN</a>
                        </p>
                        <p>
                            Route translate: <a href="{{route('home_index')}}">{{route('home_index')}}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
