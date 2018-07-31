<?php
// This class was automatically generated by a giiant build task
// You should not change it manually as it will be overwritten on next build

namespace app\models\base;

use Yii;

/**
 * This is the base-model class for table "Course".
 *
 * @property integer $ID
 * @property string $Name
 * @property integer $School_ID
 *
 * @property \app\models\School $school
 * @property \app\models\SubjectGroup[] $subjectGroups
 * @property string $aliasModel
 */
abstract class Course extends \yii\db\ActiveRecord
{



    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'Course';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['Name', 'School_ID'], 'required'],
            [['School_ID'], 'integer'],
            [['Name'], 'string', 'max' => 155],
            [['School_ID'], 'exist', 'skipOnError' => true, 'targetClass' => \app\models\School::className(), 'targetAttribute' => ['School_ID' => 'ID']]
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
            'School_ID' => 'School  ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSchool()
    {
        return $this->hasOne(\app\models\School::className(), ['ID' => 'School_ID']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSubjectGroups()
    {
        return $this->hasMany(\app\models\SubjectGroup::className(), ['Course_ID' => 'ID']);
    }




}
