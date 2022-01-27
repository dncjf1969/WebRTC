package com.wish.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QCustomQuestion is a Querydsl query type for CustomQuestion
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCustomQuestion extends EntityPathBase<CustomQuestion> {

    private static final long serialVersionUID = 1935108684L;

    public static final QCustomQuestion customQuestion = new QCustomQuestion("customQuestion");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final NumberPath<Long> meetingroomId = createNumber("meetingroomId", Long.class);

    public QCustomQuestion(String variable) {
        super(CustomQuestion.class, forVariable(variable));
    }

    public QCustomQuestion(Path<? extends CustomQuestion> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCustomQuestion(PathMetadata metadata) {
        super(CustomQuestion.class, metadata);
    }

}

