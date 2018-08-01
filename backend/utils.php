<?php
namespace app\utils;

class Utils {
    public static function camelizeIndexes($fields){
        $newFields = [];
        foreach($fields as $key => $value){
            $newKey = lcfirst(str_replace('ID', 'id', $key));
            $newFields[$newKey] = $value;
        }
        return $newFields;
    }
};