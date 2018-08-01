<?php

namespace app\models;

use app\utils\Utils;
use Yii;
use yii\helpers\Inflector;
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
        $totalMarksAverage = 0;
        $tasksByID = [];
        $fields['Subjects'] = function($model) use (&$totalMarksAverage, &$tasksByID) {
            $subjects = [];
            foreach ($model->getSubjects()->all() as $key => $subject) {
                $subjects[$key] = $subject->toArray();
                $tasks = $subject->getTasks()->select(['ID','Name','MarkWeightAverage','TotalMark'])->andWhere(['Class_ID'=>$model->ID])->asArray()->all();
                foreach ($tasks as $keyTask => $task){
                    $tasksByID[$task['ID']] = $task;
                    $subjects[$key]['Tasks'][$keyTask] = Utils::camelizeIndexes($task);
                    $totalMarksAverage += $task['MarkWeightAverage'];
                }
                $subjects[$key] = Utils::camelizeIndexes($subjects[$key]);
            }
            return $subjects;
        };
        $fields['Students'] = function($model) use (&$totalMarksAverage, &$tasksByID){
            $studentQuery = $model->getStudents()->select(['Student.ID', 'User.Name', 'User.Email']);
            if(Yii::$app->user->identity->Role_ID === STUDENT_ROLE_ID){
                $studentQuery->where(['in', 'Student.ID', Yii::$app->user->identity->getStudents()->select('ID')]);
            }
            $students = $studentQuery->asArray()->all();
            $taskQuery = $model->getTasks()->select('ID');
            foreach ($students as $key => $subject) {
                $students[$key]['Marks'] = Mark::find()
                                            ->select(['Mark.ID', 'Task.ID AS Task_ID', 'Value', 'Approved'])
                                            ->rightJoin('Task', 'Mark.Task_ID = Task.ID')
                                            ->where(['in', 'Mark.Task_ID', $taskQuery])
                                            ->asArray()
                                            ->all();
                $totalMarks = 0;
                foreach($students[$key]['Marks'] as $markKey => $mark){
                    $taskID = $mark['Task_ID'];
                    $totalMark = $tasksByID[$taskID]['TotalMark'];
                    $markWeightAverage = $tasksByID[$taskID]['MarkWeightAverage'];

                    $students[$key]['Marks'][$markKey]['CorrectionPercentage'] = $mark['Value'] / $totalMark;
                    $totalMarks += $markWeightAverage * $students[$key]['Marks'][$markKey]['CorrectionPercentage'];
                    $students[$key]['Marks'][$markKey] = Utils::camelizeIndexes($students[$key]['Marks'][$markKey]);
                }
                $students[$key]['TotalMarksCorrectionPercentage'] = $totalMarks/$totalMarksAverage;
                $students[$key] = Utils::camelizeIndexes($students[$key]);
            }
            return $students;
        };
        return Utils::camelizeIndexes($fields,true);
    }
}
