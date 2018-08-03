<?php

namespace app\controllers;

use app\models\CourseClass;
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
        var_dump($model->fields());
        die($id);
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