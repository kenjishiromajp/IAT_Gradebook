<?php

namespace app\models\base;

use app\models\CourseClassQuery;
use Yii;

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
class CourseClass extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
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
    public function getStudentClasses()
    {
        return $this->hasMany(StudentClass::className(), ['Class_ID' => 'ID']);
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
}
