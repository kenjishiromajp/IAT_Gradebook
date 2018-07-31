<?php

namespace app\models;

/**
 * This is the ActiveQuery class for [[CourseClass]].
 *
 * @see CourseClass
 */
class CourseClassQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return CourseClass[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return CourseClass|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
