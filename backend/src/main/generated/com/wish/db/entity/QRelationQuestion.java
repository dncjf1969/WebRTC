package com.wish.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QRelationQuestion is a Querydsl query type for RelationQuestion
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QRelationQuestion extends EntityPathBase<RelationQuestion> {

    private static final long serialVersionUID = 1291746455L;

    public static final QRelationQuestion relationQuestion = new QRelationQuestion("relationQuestion");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final NumberPath<Long> childId = createNumber("childId", Long.class);

    public final NumberPath<Integer> count = createNumber("count", Integer.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final NumberPath<Long> parentId = createNumber("parentId", Long.class);

    public QRelationQuestion(String variable) {
        super(RelationQuestion.class, forVariable(variable));
    }

    public QRelationQuestion(Path<? extends RelationQuestion> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRelationQuestion(PathMetadata metadata) {
        super(RelationQuestion.class, metadata);
    }

}

