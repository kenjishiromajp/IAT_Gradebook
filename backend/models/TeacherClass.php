<?php

namespace app\models;

use Yii;
use \app\models\base\TeacherClass as BaseTeacherClass;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "Teacher_Class".
 */
class TeacherClass extends BaseTeacherClass
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
