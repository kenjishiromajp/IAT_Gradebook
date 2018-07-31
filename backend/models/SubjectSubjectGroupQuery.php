<?php

namespace app\models;

/**
 * This is the ActiveQuery class for [[SubjectSubjectGroup]].
 *
 * @see SubjectSubjectGroup
 */
class SubjectSubjectGroupQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return SubjectSubjectGroup[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return SubjectSubjectGroup|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
