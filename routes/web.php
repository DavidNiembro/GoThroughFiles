<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Symfony\Component\Finder\Finder;

Route::get('/', function () {
    //return view('welcome');


    $finder = new Finder();
    //print_r(__DIR__);
    $finder->files()->in("P:\\")->name("/(\.php|\.md|\.txt|\.pdf|\.docx|\.vsdx|\.css|\.html|\.doc|\.rtf|\.js|\.xml|\.json|\.log|\.ipt|\.odt|\.wks|\.wpd)$/");

    $fileContainer = array();
    foreach ($finder as $file) {
        // dumps the absolute path
        $arrayFile = array();
        $arrayFile["path"] = $file->getRealPath();
        $arrayFile["content"] = $file->getContents();

        array_push($fileContainer, $arrayFile);
        //echo $file->getRealPath() . "\r\n<br />";
        //echo "\t\t" . $file->getContents() . "\r\b\r\n<br />------------------------------------------------------------------------\r\n\r\n<br />";
//        var_dump($file->getRealPath());
//
//        // dumps the relative path to the file, omitting the filename
//        var_dump($file->getRelativePath());
//
//        // dumps the relative path to the file
//        var_dump($file->getRelativePathname());
    }
    print_r($fileContainer);

});
