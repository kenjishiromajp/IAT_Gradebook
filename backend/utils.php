<?php
namespace app\utils;

class Utils {
    public static function camelizeIndexes($fields){
        $newFields = [];
        foreach($fields as $key => $value){
            $keySeparatedByUnderscore = explode('_',$key);
            $keySeparatedByUnderscore = array_map(function($word){
                return lcfirst(str_replace('ID', 'id', $word));
            },$keySeparatedByUnderscore);
            $newKey = implode('_', $keySeparatedByUnderscore);
            $newFields[$newKey] = $value;
        }
        return $newFields;
    }
    public static function pascoalizeIndexes($fields){
        $newFields = [];
        foreach($fields as $key => $value){
            $keySeparatedByUnderscore = explode('_',$key);
            $keySeparatedByUnderscore = array_map(function($word){
                return ucfirst(str_replace('id', 'ID', $word));
            },$keySeparatedByUnderscore);
            $newKey = implode('_', $keySeparatedByUnderscore);
            $newFields[$newKey] = $value;
        }
        return $newFields;
    }
};