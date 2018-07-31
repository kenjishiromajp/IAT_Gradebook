<?php

namespace app\models;

use Yii;
use \app\models\base\Task as BaseTask;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "Task".
 */
class Task extends BaseTask
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
