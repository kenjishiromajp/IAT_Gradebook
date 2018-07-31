<?php

namespace app\models;

use Yii;
use \app\models\base\TeacherSubject as BaseTeacherSubject;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "Teacher_Subject".
 */
class TeacherSubject extends BaseTeacherSubject
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
