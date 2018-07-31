<?php

namespace app\controllers;

use app\models\User;
use yii\data\ActiveDataProvider;

class UserController extends CorActiveController
{
    public $modelClass = 'app\models\User';
    public function actionLogin() {
        $params = \Yii::$app->getRequest()->getBodyParams();
        $user = User::findByEmail($params['Email']);
        $user->scenario = 'login';
        if ($user && $user->validatePassword($params['Password'])) {
            return [
                'Name' => $user->Name,
                'Role' => $user->role->Name,
                'Email' => $user->Email,
                'Token' => $user->generateToken()
            ];
        }
        \Yii::$app->getResponse()->statusCode = 401;
        return ['message'=>'Incorrect email or password'];
    }
}