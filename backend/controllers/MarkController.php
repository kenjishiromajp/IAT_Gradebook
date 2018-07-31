<?php

namespace app\controllers;

use app\models\Mark;
use app\models\User;

class MarkController extends CorActiveController
{
    public $modelClass = 'app\models\Mark';
    public function actions()
    {
        $actions = parent::actions();
        unset($actions['index']);
        return $actions;
    }

    public function actionIndex() {
        $admin = new User();
        $admin->load([
            'Name' => 'Admin',
            'Email' => 'admin@admin.com',
            'Password' => 'admin',
            'Role_ID' => '1',
        ],'');
        $admin->save();


        $principal = new User();
        $principal->load([
            'Name' => 'Principal',
            'Email' => 'principal@principal.com',
            'Password' => 'principal',
            'Role_ID' => '2',
        ],'');
        $principal->save();

        $teacher = new User();
        $teacher->load([
            'Name' => 'Principal',
            'Email' => 'teacher@teacher.com',
            'Password' => 'teacher',
            'Role_ID' => '3',
        ],'');
        $teacher->save();

        $student = new User();
        $student->load([
            'Name' => 'Principal',
            'Email' => 'student@student.com',
            'Password' => 'student',
            'Role_ID' => '4',
        ],'');
        $student->save();
//        $getParams = \Yii::$app->request->get();
//        return Mark::find()->where($getParams)->all();
    }
}