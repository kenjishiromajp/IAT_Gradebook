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
        $approvedMarks = [];
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
            if($model->Approved){
                $approvedMarks[] = $model;
            }
            $newMarks[] = $model;
        }
        $this->verifyIfAllMarksOfOneSubjectIsReady($marks);
        if(count($approvedMarks)){
            $this->notifyStudents($approvedMarks);
        }
        return $newMarks;
    }

    private function verifyIfAllMarksOfOneSubjectIsReady($marks){

    }

    private function notifyStudents($approvedMarks){
        $htmlBody = '<h3>Hi there! following Marks are available for you!</h3>';
        $ul = '<ul>';
        foreach ($approvedMarks as $mark) {
            $htmlBody .= '<li> <strong>'.$mark->task->Name.'</strong>: '.$mark->Value.'</li>';
        }
        $ul .= '</ul>';
        $htmlBody .= $ul;
        Yii::$app->mailer->compose()
            ->setFrom(Yii::$app->params['adminEmail'])
            ->setTo($mark->student->user->Email)
            ->setSubject($mark->student->user->Name.' some Marks was approved! - IAT')
            ->setHtmlBody($htmlBody)
            ->send();
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