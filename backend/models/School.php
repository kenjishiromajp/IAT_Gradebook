<?php

namespace app\models;

use Yii;
use \app\models\base\School as BaseSchool;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "School".
 */
class School extends BaseSchool
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
