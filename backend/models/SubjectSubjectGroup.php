<?php

namespace app\models;

use Yii;
use \app\models\base\SubjectSubjectGroup as BaseSubjectSubjectGroup;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "Subject_SubjectGroup".
 */
class SubjectSubjectGroup extends BaseSubjectSubjectGroup
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
