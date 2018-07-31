<?php

namespace app\models;

use Yii;
use \app\models\base\Teacher as BaseTeacher;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "Teacher".
 */
class Teacher extends BaseTeacher
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
