<?php

namespace app\controllers;

use app\models\Mark;
use app\models\Student;
use app\models\StudentClass;
use app\models\Subject;
use app\models\Teacher;
use app\models\TeacherClass;
use app\models\User;
use app\utils\Utils;
use Yii;
use yii\db\Query;
use yii\helpers\VarDumper;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;
use yii\helpers\Url;

class MarkController extends AuthCorActiveController
{
    public $modelClass = 'app\models\Mark';

    public function actions()
    {
        $actions =  parent::actions();
        unset($actions['create']);
        return $actions;
    }

    public function actionCreate(){
        $model = new Mark();
        $model->load(Yii::$app->getRequest()->getBodyParams(), '');
        if ($model->save()) {
            $response = Yii::$app->getResponse();
            $response->setStatusCode(201);
            $id = implode(',', array_values($model->getPrimaryKey(true)));
            $response->getHeaders()->set('Location', Url::toRoute(['view', 'id' => $id], true));
            $this->verifyIfAllMarksOfOneSubjectIsReady($model);
        } elseif (!$model->hasErrors()) {
            throw new ServerErrorHttpException('Failed to create the object for unknown reason.');
        }
        return $model;
    }

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

    private function verifyIfAllMarksOfOneSubjectIsReady($mark){
        $teacherClassID = $mark->task->TeacherClass_ID;
        $quantityOfMarksNeedsToBeDone = (new Query())
            ->select('m.*')
            ->from('Student_Class as sc')
            ->leftJoin('Class AS c', 'sc.Class_ID=c.ID')
            ->leftJoin('Teacher_Class AS tc', 'c.ID=tc.Class_ID')
            ->leftJoin('Task AS t', 'tc.ID=t.TeacherClass_ID')
            ->where([
                'tc.ID'=>$teacherClassID,
            ])->count();

        $marksDone = (new Query())
            ->select('m.*')
            ->from('Mark as m')
            ->leftJoin('Task AS t', 'm.Task_ID=t.ID')
            ->leftJoin('Teacher_Class AS tc', 't.TeacherClass_ID=tc.ID')
            ->where([
                'tc.ID'=>$teacherClassID,
            ])->count();

        if($marksDone >= $quantityOfMarksNeedsToBeDone){
            $teacher = Teacher::find()
                ->alias('t')
                ->leftJoin('Teacher_Class AS tc', 't.ID=tc.Teacher_ID')
                ->where(['tc.ID'=>$teacherClassID])
                ->one()
                ->user;
            $subject = Subject::find()->alias('s')->leftJoin('Teacher_Class as tc', 's.ID=tc.Subject_ID')->where(['tc.ID'=>$teacherClassID])->one();
            $principals = User::find()->where(['Role_ID'=> PRINCIPAL_ROLE_ID])->all();
            foreach ($principals as $principal) {
                $htmlBody = '<h3>Hi there! Teacher:'.$teacher->Name.' Completed Gradebook of Subject '.$subject->Name.'</h3>';
                $htmlBody .= '<p>Enter in the system and approve or disapprove the marks!</p>';
                Yii::$app->mailer->compose()
                    ->setFrom(Yii::$app->params['adminEmail'])
                    ->setTo($principal->Email)
                    ->setSubject($teacher->Name.' have completed one Gradebook! - IAT')
                    ->setHtmlBody($htmlBody)
                    ->send();
            }
        }
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