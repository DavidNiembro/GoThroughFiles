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
    $myFile = fopen("output_json.txt", "rb");
    $content = fread($myFile, filesize("output_json.txt"));
    $array = json_decode($content, true);

    $arrayOfMetaDataToSearch = array("path", "content");
    $wordToSearch = "Salut";
    foreach($arrayOfMetaDataToSearch as $metaData){
        foreach($array["files"] as $key => $value) {
            if(strpos($value[$metaData], $wordToSearch) !== false){
                echo "<br />Trouvé " .  $wordToSearch . " dans " . $metaData . " du fichier " . $value["path"] . "\r\n<br />";
            }
        }
    }

});

Route::get('/generateJson', function () {
    set_time_limit(600);
    ini_set('memory_limit', '-1');

    function utf8ize($d) {
        if (is_array($d)) {
            foreach ($d as $k => $v) {
                $d[$k] = utf8ize($v);
            }
        } else if (is_string ($d)) {
            return utf8_encode($d);
        }
        return $d;
    }

    $finder = new Finder();
    //print_r(__DIR__);
    $finder->files()->in("P:\\")->name("/(\.php|\.md|\.txt|\.pdf|\.docx|\.vsdx|\.css|\.html|\.doc|\.rtf|\.js|\.xml|\.json|\.log|\.ipt|\.odt|\.wks|\.wpd)$/");

    $fileContainer["files"] = array();
    foreach ($finder as $file) {
        // dumps the absolute path
        $arrayFile = array();
        $arrayFile["path"] = $file->getRealPath();
        $arrayFile["content"] = $file->getContents();

        array_push($fileContainer["files"], $arrayFile);
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
    //print_r($fileContainer);
   // print_r($fileContainer);

    $encoded = json_encode(utf8ize($fileContainer));
    print_r(error_get_last());
    $myFile = fopen("output_json.txt", "w");
    fwrite($myFile, $encoded);
    fclose($myFile);
});
