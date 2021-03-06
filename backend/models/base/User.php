<?php
// This class was automatically generated by a giiant build task
// You should not change it manually as it will be overwritten on next build

namespace app\models\base;

use Yii;

/**
 * This is the base-model class for table "User".
 *
 * @property integer $ID
 * @property string $Name
 * @property string $Email
 * @property string $Password
 * @property string $AccessToken
 * @property integer $Role_ID
 *
 * @property \app\models\Student[] $students
 * @property \app\models\Teacher[] $teachers
 * @property \app\models\Role $role
 * @property string $aliasModel
 */
abstract class User extends \yii\db\ActiveRecord
{



    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'User';
    }

    public $username = '';

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['Name', 'Email', 'Password', 'Role_ID'], 'required'],
            [['Role_ID'], 'integer'],
            [['Name', 'Email', 'Password', 'AccessToken'], 'string', 'max' => 155],
            [['Role_ID'], 'exist', 'skipOnError' => true, 'targetClass' => \app\models\Role::className(), 'targetAttribute' => ['Role_ID' => 'ID']]
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
            'Email' => 'Email',
            'Password' => 'Password',
            'AccessToken' => 'Access Token',
            'Role_ID' => 'Role  ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStudents()
    {
        return $this->hasMany(\app\models\Student::className(), ['User_ID' => 'ID']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTeacher()
    {
        return $this->hasOne(\app\models\Teacher::className(), ['Teacher.ID' => 'ID']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getRole()
    {
        return $this->hasOne(\app\models\Role::className(), ['ID' => 'Role_ID']);
    }




}
