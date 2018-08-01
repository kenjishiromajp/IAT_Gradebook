<?php
namespace app\controllers;
use yii\filters\auth\HttpBearerAuth;

class AuthCorActiveController extends \yii\rest\ActiveController
{

    public function behaviors() {
        return array_merge(parent::behaviors(), [
            'bearerAuth' => [
                'class' => HttpBearerAuth::className(),
            ]
        ]);
    }
    public function beforeAction($action) {
        $beforeAction = parent::beforeAction($action);

        if (\Yii::$app->request->isOptions) {
            \Yii::$app->response->statusCode = 200;
            return false;
        }

        return $beforeAction;
    }
}