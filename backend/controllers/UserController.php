<?php

namespace app\controllers;

use app\models\User;
use yii\data\ActiveDataProvider;

class UserController extends CorActiveController
{
    public $modelClass = 'app\models\User';
    public function actionLogin() {
        $params = \Yii::$app->getRequest()->getBodyParams();
        $user = new User();
        $user->scenario = 'login';
        $user->load($params, '');
        if(!$user->validate()){
            return $user;
        }
        $email = $user->Email;
        $password = $user->Password;
        $user = User::findByEmail($email);
        if ($user && $user->validatePassword($password)) {
            return [
                'name' => $user->Name,
                'role' => $user->role->Name,
                'email' => $user->Email,
                'token' => $user->generateToken()
            ];
        }
        \Yii::$app->getResponse()->statusCode = 401;
        return ['message'=>'Incorrect email or password'];
    }
}