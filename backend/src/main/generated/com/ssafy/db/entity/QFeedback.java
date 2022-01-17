package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QFeedback is a Querydsl query type for Feedback
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QFeedback extends EntityPathBase<Feedback> {

    private static final long serialVersionUID = -179501753L;

    public static final QFeedback feedback = new QFeedback("feedback");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath meetingroomId = createString("meetingroomId");

    public final StringPath memberId = createString("memberId");

    public final StringPath question = createString("question");

    public final NumberPath<Float> rate = createNumber("rate", Float.class);

    public QFeedback(String variable) {
        super(Feedback.class, forVariable(variable));
    }

    public QFeedback(Path<? extends Feedback> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFeedback(PathMetadata metadata) {
        super(Feedback.class, metadata);
    }

}

