<?php

namespace app\controllers;

use app\models\Mark;
use app\utils\Utils;
use Yii;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;

class MarkController extends AuthCorActiveController
{
    public $modelClass = 'app\models\Mark';

    public function actionEditmanymarks(){
        $marks = Yii::$app->getRequest()->getBodyParams();
        $newMarks = [];
        foreach ($marks as $mark) {
            $newMark = Utils::pascoalizeIndexes($mark);
            if($newMark['Approved']){
                $newMark['Description'] = null;
            }
            $model = $this->findModel($newMark['ID']);
            $model->load(Utils::pascoalizeIndexes($newMark), '');
            if ($model->save() === false && !$model->hasErrors()) {
                throw new ServerErrorHttpException('Failed to update the object for unknown reason.');
            }
            $newMarks[] = $model;
        }
        $this->verifyIfAllMarksOfOneGradebookIsReady($marks);
        return $newMarks;
    }

    private function verifyIfAllMarksOfOneGradebookIsReady($marks){

    }

    private function findModel($id)
    {
        $model = Mark::findOne($id);
        if (isset($model)) {
            return $model;
        }
        throw new NotFoundHttpException("Object not found: $id");
    }
}