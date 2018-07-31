<?php

namespace app\models;

use Yii;
use \app\models\base\StudentClass as BaseStudentClass;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "Student_Class".
 */
class StudentClass extends BaseStudentClass
{

    public function behaviors()
    {
        return ArrayHelper::merge(
            parent::behaviors(),
            [
                # custom behaviors
            ]
        );
    }

    public function rules()
    {
        return ArrayHelper::merge(
            parent::rules(),
            [
                # custom validation rules
            ]
        );
    }
}
