<?php
// This class was automatically generated by a giiant build task
// You should not change it manually as it will be overwritten on next build

namespace app\models\base;

use Yii;

/**
 * This is the base-model class for table "SubjectGroup".
 *
 * @property integer $ID
 * @property string $DurationValue
 * @property string $DurationUnit
 * @property string $StartDate
 * @property string $EndDate
 * @property integer $Course_ID
 *
 * @property \app\models\Class[] $classes
 * @property \app\models\Course $course
 * @property \app\models\SubjectSubjectGroup[] $subjectSubjectGroups
 * @property \app\models\Subject[] $subjects
 * @property string $aliasModel
 */
abstract class SubjectGroup extends \yii\db\ActiveRecord
{



    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'SubjectGroup';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['DurationValue', 'DurationUnit', 'StartDate', 'Course_ID'], 'required'],
            [['DurationValue'], 'number'],
            [['StartDate', 'EndDate'], 'safe'],
            [['Course_ID'], 'integer'],
            [['DurationUnit'], 'string', 'max' => 155],
            [['Course_ID'], 'exist', 'skipOnError' => true, 'targetClass' => \app\models\Course::className(), 'targetAttribute' => ['Course_ID' => 'ID']]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'ID' => 'ID',
            'DurationValue' => 'Duration Value',
            'DurationUnit' => 'Duration Unit',
            'StartDate' => 'Start Date',
            'EndDate' => 'End Date',
            'Course_ID' => 'Course  ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getClasses()
    {
        return $this->hasMany(\app\models\CourseClass::className(), ['SubjectGroup_ID' => 'ID']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCourse()
    {
        return $this->hasOne(\app\models\Course::className(), ['ID' => 'Course_ID']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSubjectSubjectGroups()
    {
        return $this->hasMany(\app\models\SubjectSubjectGroup::className(), ['SubjectGroup_ID' => 'ID']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSubjects()
    {
        return $this->hasMany(\app\models\Subject::className(), ['ID' => 'Subject_ID'])->viaTable('Subject_SubjectGroup', ['SubjectGroup_ID' => 'ID']);
    }




}
