<?php
// This class was automatically generated by a giiant build task
// You should not change it manually as it will be overwritten on next build

namespace app\models\base;

use Yii;

/**
 * This is the base-model class for table "Student".
 *
 * @property integer $ID
 * @property integer $User_ID
 * @property string $Value
 * @property integer $Approved
 *
 * @property \app\models\User $user
 * @property \app\models\StudentClass[] $studentClasses
 * @property string $aliasModel
 */
abstract class Student extends \yii\db\ActiveRecord
{



    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'Student';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['User_ID', 'Value', 'Approved'], 'required'],
            [['User_ID', 'Approved'], 'integer'],
            [['Value'], 'number'],
            [['User_ID'], 'exist', 'skipOnError' => true, 'targetClass' => \app\models\User::className(), 'targetAttribute' => ['User_ID' => 'ID']]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'ID' => 'ID',
            'User_ID' => 'User  ID',
            'Value' => 'Value',
            'Approved' => 'Approved',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(\app\models\User::className(), ['ID' => 'User_ID']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStudentClasses()
    {
        return $this->hasMany(\app\models\StudentClass::className(), ['Student_ID' => 'ID']);
    }




}
