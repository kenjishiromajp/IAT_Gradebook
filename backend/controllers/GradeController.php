<?php

namespace app\controllers;

use app\models\CourseClass;
use app\models\School;
use moonland\phpexcel\Excel;
use yii\data\ActiveDataFilter;
use yii\data\ActiveDataProvider;
use Yii;
use yii\web\NotFoundHttpException;

class GradeController extends AuthCorActiveController
{
    public $modelClass = 'app\models\CourseClass';

    public function actions()
    {
        $actions = parent::actions();
        unset($actions['index']);
        return $actions;
    }

    public function actionIndex() {
        $requestParams = Yii::$app->getRequest()->getBodyParams();
        if (empty($requestParams)) {
            $requestParams = Yii::$app->getRequest()->getQueryParams();
        }

        $filter = null;
        $dataFilter = new ActiveDataFilter();
        if ($dataFilter->load($requestParams)) {
            $filter = $dataFilter->build();
            if ($filter === false) {
                return $dataFilter;
            }
        }

        $modelClass = $this->modelClass;
        $query = $modelClass::find();
        if (!empty($filter)) {
            $query->andWhere($filter);
        }
        if(Yii::$app->user->identity->Role_ID === STUDENT_ROLE_ID){
            $query
                ->leftJoin('Student_Class as sc', 'Class.ID = sc.Class_ID')
                ->where(['in', 'sc.Student_ID', Yii::$app->user->identity->getStudents()->select('ID')]);
        }
        if(Yii::$app->user->identity->Role_ID === TEACHER_ROLE_ID){
            $query
                ->leftJoin('Teacher_Class as tc', 'Class.ID = tc.Class_ID')
                ->where(['in', 'tc.Teacher_ID', Yii::$app->user->identity->teacher->ID]);
        }
        return new ActiveDataProvider([
            'query' => $query,
            'pagination' => false,
            'sort' => [
                'params' => $requestParams,
            ],
        ]);
    }

    public function actionDownload($id)
    {
        $model = $this->findModel($id);
        $query = $model->getStudentClasses()
            ->select('u.Name AS StudentName, m.Value AS Mark, t.Name AS TaskName, t.ID AS Task_ID, sub.Name AS Subject')
            ->leftJoin('Student as s', 'Student_Class.Student_ID = s.ID')
            ->leftJoin('User as u', 's.User_ID = u.ID')
            ->leftJoin('Mark as m', 'Student_Class.ID = m.Student_Class_ID')
            ->leftJoin('Task as t', 'm.Task_ID = t.ID')
            ->leftJoin('Teacher_Class as tc', 't.TeacherClass_ID = tc.ID')
            ->leftJoin('Subject as sub', 'tc.Subject_ID = sub.ID');
        $marks = $query->asArray()->all();

        $columns = ['StudentName'];
        $headers = ['StudentName' => 'Student Name'];
        $marksByStudents = [];
        foreach ($marks as $mark) {
            $taskID = $mark['Task_ID'];
            $taskName = $mark['TaskName'].' ('.$mark['Subject'].')';
            $studentName = $mark['StudentName'];
            if(!in_array($taskID,$columns)){
                $columns[] = $taskID;
                $headers[$taskID] = $taskName;
            }
            if(!array_key_exists($studentName,$marksByStudents)){
                $marksByStudents[$studentName] = ['StudentName'=>$studentName];
            }
            $marksByStudents[$studentName][$taskID] = $mark['Mark'];
        }
        $marksByStudents = array_values($marksByStudents);
        header('Access-Control-Allow-Origin: *');
        Excel::widget([
            'asArray' => true,
            'models' => $marksByStudents,
            'mode' => 'export',
            'columns' => $columns,
            'headers' => $headers,
        ]);
    }

    private function findModel($id)
    {
        $model = CourseClass::findOne($id);
        if (isset($model)) {
            return $model;
        }
        throw new NotFoundHttpException("Object not found: $id");
    }
}