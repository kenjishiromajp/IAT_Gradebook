<?php

namespace app\models;

use Yii;
use \app\models\base\SubjectGroup as BaseSubjectGroup;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "SubjectGroup".
 */
class SubjectGroup extends BaseSubjectGroup
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
