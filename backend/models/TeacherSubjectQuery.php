<?php

namespace app\models;

/**
 * This is the ActiveQuery class for [[TeacherSubject]].
 *
 * @see TeacherSubject
 */
class TeacherSubjectQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return TeacherSubject[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return TeacherSubject|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
