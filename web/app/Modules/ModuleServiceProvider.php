<?php   namespace App\Modules;

use Illuminate\Support\ServiceProvider;
use Illuminate\View\FileViewFinder;
use Request;

class ModuleServiceProvider extends ServiceProvider{
    
    public function register(){
        $this->app->bind('view.finder', function($app)
        {
            /**
             * set themes
             */
            $paths = $app['config']['view.paths'];
            if(Request::is('admin') || Request::is('admin/*')){
                $theme = \Config::get('site.theme.backend');
            }else{
                $theme = \Config::get('site.theme.frontend');
            }
//            $paths = Config::get('view.paths');
            array_unshift($paths, base_path() . '/public/themes/' . $theme . '/views');
            \Config::set('view.paths', $paths);

            return new FileViewFinder($app['files'], $paths);
        });
    }
    
    public function boot(){
        $modules = config('module.modules');

        $module = $modules['site'];
        if(Request::is('admin') || Request::is('admin/*')){
            $module = $modules['admin'];
        }
        elseif(Request::is('api') || Request::is('api/*')){
            $module = $modules['api'];
        }
        

        if(file_exists(__DIR__ . '/' . $module . '/routes.php')){
            include __DIR__ . '/' . $module . '/routes.php';
        }

        if(is_dir(__DIR__ . '/' . $module . '/Views')){
            $this->loadViewsFrom(__DIR__ . '/' . $module . '/Views', $module);
        }
       
    }
}
    