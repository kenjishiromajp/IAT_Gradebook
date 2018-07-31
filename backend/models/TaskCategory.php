<?php

namespace app\models;

use Yii;
use \app\models\base\TaskCategory as BaseTaskCategory;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "TaskCategory".
 */
class TaskCategory extends BaseTaskCategory
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
