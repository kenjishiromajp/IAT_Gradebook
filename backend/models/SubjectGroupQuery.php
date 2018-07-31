<?php

namespace app\models;

/**
 * This is the ActiveQuery class for [[SubjectGroup]].
 *
 * @see SubjectGroup
 */
class SubjectGroupQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return SubjectGroup[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return SubjectGroup|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
