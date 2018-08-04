<?php

namespace app\models;

use Yii;
use \app\utils\Utils;
use \app\models\base\Mark as BaseMark;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "Mark".
 */
class Mark extends BaseMark
{
    public $Student_ID;
    public $Class_ID;

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
                [['Student_ID', 'Class_ID', 'Task_ID','Value'], 'required', 'on'=>'insert'],
                [['Value'], 'number', 'min'=> 0],
                ['Task_ID', 'exist', 'targetClass' => Task::className(), 'targetAttribute' => 'ID'],
                [['Value'], 'validateMaxValueOfTask'],
                [['Student_ID'], 'validateIfStudentExistOnClass'],
                [['Class_ID','Description'], 'safe'],
            ]
        );
    }

    public function validateMaxValueOfTask($attribute, $params){
        $task = Task::findOne($this->Task_ID);
        if(!$task){
            return $this->addError('Task_ID', "This task doesn't exist");
        }
        if($this->$attribute > $task->TotalMark){
            $this->addError($attribute, "Max Value for this Task is $task->TotalMark");
        }
    }

    public function validateIfStudentExistOnClass($attribute, $params){
        $studentClass = StudentClass::find()->where([
            'Student_ID' => $this->Student_ID,
            'Class_ID' => $this->Class_ID,
        ])->one();
        if(!$studentClass){
            $this->addError($attribute, "There is no Student with this student_id: $this->Student_ID on class_id:$this->Class_ID");
        }
    }

    public function beforeSave($insert)
    {
        if($insert){
            $studentClass = StudentClass::find()->where([
                'Student_ID' => $this->Student_ID,
                'Class_ID' => $this->Class_ID,
            ])->one();
            $this->Student_Class_ID = $studentClass->ID;
            $this->Approved = false;
        }
        if(Yii::$app->user->identity->Role_ID >= TEACHER_ROLE_ID){
            $this->Approved = false;
        }
        return parent::beforeSave($insert);
    }

    public function fields()
    {
        $fields = parent::fields();
        $fields = Utils::camelizeIndexes($fields);
        return $fields;
    }

    public function load($data, $formName = null)
    {
        $data = Utils::pascoalizeIndexes($data);
        // Verifying is Role that can approve it or not
        if(Yii::$app->user->identity->Role_ID > PRINCIPAL_ROLE_ID ){
            unset($data['Approved']);
            unset($data['Description']);
        }
        return parent::load($data, $formName);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStudent()
    {
        $query = Student::find()
            ->select('s.*')
            ->alias('s')
            ->leftJoin('Student_Class AS sc', 's.ID = sc.Student_ID')
            ->leftJoin('Mark AS m', 'sc.ID = m.Student_Class_ID')
            ->where(['m.ID'=>$this->ID]);
        return $query;
    }
}
