<?php
namespace app\controllers;
class CorActiveController extends \yii\rest\ActiveController
{

    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'items',
    ];
    public function behaviors() {
        return array_merge(parent::behaviors(), [
            'corsFilter'  => [
                'class' => \yii\filters\Cors::className(),
                'cors'  => [
                    'Origin' => ['*'],
                    'Access-Control-Request-Headers' => ['Content-Type', 'Authorization'],
                    'Access-Control-Request-Method'    => ['POST','PUT','PATCH','DELETE','GET'],
                    'Access-Control-Allow-Origin' => '*',
                ],
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