<?php

namespace app\controllers;

use app\models\Mark;
use app\models\StudentClass;
use app\utils\Utils;
use Yii;
use yii\web\ServerErrorHttpException;
use yii\web\UnprocessableEntityHttpException;

class MarkController extends AuthCorActiveController
{
    public $modelClass = 'app\models\Mark';
}