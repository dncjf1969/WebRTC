package com.wish.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QQuestion is a Querydsl query type for Question
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QQuestion extends EntityPathBase<Question> {

    private static final long serialVersionUID = 683294587L;

    public static final QQuestion question = new QQuestion("question");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final StringPath content = createString("content");

    public final NumberPath<Integer> count = createNumber("count", Integer.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath type = createString("type");

    public QQuestion(String variable) {
        super(Question.class, forVariable(variable));
    }

    public QQuestion(Path<? extends Question> path) {
        super(path.getType(), path.getMetadata());
    }

    public QQuestion(PathMetadata metadata) {
        super(Question.class, metadata);
    }

}

