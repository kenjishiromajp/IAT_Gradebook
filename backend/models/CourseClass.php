<?php

namespace app\models;

use Yii;
use yii\helpers\VarDumper;

/**
 * This is the model class for table "CourseClass".
 *
 * @property int $ID
 * @property string $Name
 * @property string $StartDate
 * @property string $EndDate
 * @property int $SubjectGroup_ID
 *
 * @property SubjectGroup $subjectGroup
 * @property StudentClass[] $studentClasses
 * @property Task[] $tasks
 * @property TeacherClass[] $teacherClasses
 * @property Teacher[] $teachers
 */
class CourseClass extends \app\models\base\CourseClass
{
    /**
     * {@inheritdoc}
     */
    public $batata = '';

    public static function tableName()
    {
        return 'Class';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['Name', 'StartDate', 'SubjectGroup_ID'], 'required'],
            [['StartDate', 'EndDate'], 'safe'],
            [['SubjectGroup_ID'], 'integer'],
            [['Name'], 'string', 'max' => 155],
            [['SubjectGroup_ID'], 'exist', 'skipOnError' => true, 'targetClass' => SubjectGroup::className(), 'targetAttribute' => ['SubjectGroup_ID' => 'ID']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'ID' => 'ID',
            'Name' => 'Name',
            'StartDate' => 'Start Date',
            'EndDate' => 'End Date',
            'SubjectGroup_ID' => 'Subject Group  ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSubjectGroup()
    {
        return $this->hasOne(SubjectGroup::className(), ['ID' => 'SubjectGroup_ID']);
    }


    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSubjects()
    {
        $querySubjectsIDs = $this->getSubjectGroup()
            ->alias('sg')
            ->leftJoin('Subject_SubjectGroup AS ssg', 'sg.ID = ssg.SubjectGroup_ID')
            ->select('ssg.Subject_ID');
        return Subject::find()
            ->alias('s')
            ->where(['in', 's.ID', $querySubjectsIDs]);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStudentClasses()
    {
        return $this->hasMany(StudentClass::className(), ['Class_ID' => 'ID']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStudents()
    {
        return $this
            ->hasMany(Student::className(), ['ID' => 'Student_ID'])
            ->viaTable('Student_Class',['Class_ID'=>'ID'])
            ->leftJoin('User', 'Student.User_ID = User.ID');
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTasks()
    {
        return $this->hasMany(Task::className(), ['Class_ID' => 'ID']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTeacherClasses()
    {
        return $this->hasMany(TeacherClass::className(), ['Class_ID' => 'ID']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTeachers()
    {
        return $this->hasMany(Teacher::className(), ['ID' => 'Teacher_ID'])->viaTable('Teacher_Class', ['Class_ID' => 'ID']);
    }

    /**
     * {@inheritdoc}
     * @return CourseClassQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new CourseClassQuery(get_called_class());
    }

    public function fields() {
        $fields = parent::fields();
        $fields['Class'] = function($model){
            return [
                'Name' =>  $model->Name,
                'ID' =>  $model->ID,
            ];
        };
        $fields['Subjects'] = function($model){
            $subjects = [];
            foreach ($model->getSubjects()->all() as $key => $subject) {
                $subjects[$key] = $subject->toArray();
                $subjects[$key]['Tasks'] = $subject->getTasks()->select(['ID','Name','MarkWeightAverage','TotalMark'])->andWhere(['Class_ID'=>$model->ID])->all();
            }
            return $subjects;
        };
        $fields['Students'] = function($model){
            $students = $model->getStudents()->select(['Student.ID', 'User.Name', 'User.Email'])->asArray()->all();
            foreach ($students as $key => $subject) {
                $students[$key]['Marks'] = Mark::find()->select(['Mark.ID', 'Task.ID AS Task_ID', 'Value', 'Approved'])->rightJoin('Task', 'Mark.Task_ID = Task.ID')->all();
            }
            return $students;
        };
        unset($fields['Name']);
        unset($fields['ID']);
//        $fields['passengers'] = function($model) {
//            $passengers = [];
//            foreach ($model->myPassengers as $passenger) {
//                $passengers[] = $passenger;
//            }
//
//            return $passengers;
//        };
//        $fields['flight_data'] = function($model) {
//            return $model->flight;
//        };

        return $fields;
    }
}
