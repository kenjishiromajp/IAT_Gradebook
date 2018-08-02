<?php

namespace app\controllers;

use app\models\Mark;
use yii\data\ActiveDataFilter;
use yii\data\ActiveDataProvider;
use Yii;

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
        return new ActiveDataProvider([
            'query' => $query,
            'pagination' => false,
            'sort' => [
                'params' => $requestParams,
            ],
        ]);
    }
}