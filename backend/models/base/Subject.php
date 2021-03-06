<?php
// This class was automatically generated by a giiant build task
// You should not change it manually as it will be overwritten on next build

namespace app\models\base;

use Yii;

/**
 * This is the base-model class for table "Subject".
 *
 * @property integer $ID
 * @property string $Name
 *
 * @property \app\models\SubjectSubjectGroup[] $subjectSubjectGroups
 * @property \app\models\SubjectGroup[] $subjectGroups
 * @property \app\models\TeacherClass[] $teacherClasses
 * @property \app\models\TeacherSubject[] $teacherSubjects
 * @property \app\models\Teacher[] $teachers
 * @property string $aliasModel
 */
abstract class Subject extends \yii\db\ActiveRecord
{



    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'Subject';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['Name'], 'required'],
            [['Name'], 'string', 'max' => 155]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'ID' => 'ID',
            'Name' => 'Name',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSubjectSubjectGroups()
    {
        return $this->hasMany(\app\models\SubjectSubjectGroup::className(), ['Subject_ID' => 'ID']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSubjectGroups()
    {
        return $this->hasMany(\app\models\SubjectGroup::className(), ['ID' => 'SubjectGroup_ID'])->viaTable('Subject_SubjectGroup', ['Subject_ID' => 'ID']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTeacherClasses()
    {
        return $this->hasMany(\app\models\TeacherClass::className(), ['Subject_ID' => 'ID']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTeacherSubjects()
    {
        return $this->hasMany(\app\models\TeacherSubject::className(), ['Subject_ID' => 'ID']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTeachers()
    {
        return $this->hasMany(\app\models\Teacher::className(), ['ID' => 'Teacher_ID'])->viaTable('Teacher_Subject', ['Subject_ID' => 'ID']);
    }




}
