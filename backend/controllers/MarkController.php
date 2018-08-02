<?php

namespace app\controllers;

use app\models\Mark;
use app\models\StudentClass;
use app\utils\Utils;
use Yii;
use yii\web\ServerErrorHttpException;
use yii\web\UnprocessableEntityHttpException;

class MarkController extends CorActiveController
{
    public $modelClass = 'app\models\Mark';
    public function actions()
    {
        $actions = parent::actions();
        return $actions;
    }
}