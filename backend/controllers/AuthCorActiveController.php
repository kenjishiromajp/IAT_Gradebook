<?php
namespace app\controllers;
use yii\filters\auth\HttpBearerAuth;

class AuthCorActiveController extends CorActiveController
{

    public function behaviors() {
        return array_merge(parent::behaviors(), [
            'bearerAuth' => [
                'class' => HttpBearerAuth::className(),
            ]
        ]);
    }
}