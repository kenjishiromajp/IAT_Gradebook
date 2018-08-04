<?php

namespace app\models;

use Yii;
use \app\utils\Utils;
use \app\models\base\User as BaseUser;
use yii\helpers\ArrayHelper;
use yii\web\IdentityInterface;

/**
 * This is the model class for table "User".
 */
class User extends BaseUser implements IdentityInterface
{
    public function load($data, $formName = null)
    {
        $data = Utils::pascoalizeIndexes($data);
        return parent::load($data, $formName);
    }

    public function scenarios()
    {
        $scenarios = parent::scenarios();
        $scenarios['login'] = ['Email', 'Password'];
        return $scenarios;
    }

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
        return [
            [['Email', 'Password'], 'required', 'on'=>'login'],
            [['Name', 'Email', 'Password', 'Role_ID'], 'required', 'on'=>'default'],
            [['Email'], 'unique', 'targetAttribute' => 'Email', 'on'=>'default'],
            [['Role_ID'], 'integer'],
            [['Name', 'Email', 'Password', 'AccessToken'], 'string', 'max' => 155],
            [['Role_ID'], 'exist', 'skipOnError' => true, 'targetClass' => \app\models\Role::className(), 'targetAttribute' => ['Role_ID' => 'ID']],
        ];
    }

    public static function findByEmail($email) {
        return static::findOne(['Email' => $email]);
    }
    public function generateToken() {
        $this->AccessToken = \Yii::$app->security->generateRandomString();
        $this->save();
        return $this->AccessToken;
    }

    public function validatePassword($password) {
        return Yii::$app->security->validatePassword($password, $this->Password);
    }
    public function getAuthKey() {
        return $this->AccessToken;
    }
    public function getId() {
        return $this->ID;
    }

    public function validateAuthKey($authKey) {
        return $this->AccessToken === $authKey;
    }

    public static function findIdentity($id) {
        return static::findOne($id);
    }
    public static function findIdentityByAccessToken($token, $type = null) {
        return static::findOne(['AccessToken' => $token]);
    }

    public function beforeSave($insert)
    {
        if($this->isNewRecord){
            $this->Password = Yii::$app->security->generatePasswordHash($this->Password);
        }
        return parent::beforeSave($insert);
    }

    public function afterSave($insert, $changedAttributes)
    {
        if($insert){
            switch ($this->Role_ID){
                case TEACHER_ROLE_ID:
                    $teacher = new Teacher();
                    $teacher->ID = $this->ID;
                    $teacher->save();
                    break;
                case STUDENT_ROLE_ID:
                    $student = new Student();
                    $student->User_ID = $this->ID;
                    $student->save();
                    break;
            }
        }
        return parent::afterSave($insert, $changedAttributes);
    }

    public function fields() {
        $fields = parent::fields();
        $fields['Role'] = function($model){
            return $model->role->Name;
        };
        unset($fields['Role_ID']);
        unset($fields['Password']);
        return Utils::camelizeIndexes($fields);
    }
}
