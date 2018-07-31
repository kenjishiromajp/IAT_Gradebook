<?php

namespace app\models;

/**
 * This is the ActiveQuery class for [[CourseClass]].
 *
 * @see CourseClass
 */
class StudentClassQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return StudentClass[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return StudentClass|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
