package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QPrequestion is a Querydsl query type for Prequestion
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QPrequestion extends EntityPathBase<Prequestion> {

    private static final long serialVersionUID = 1642271367L;

    public static final QPrequestion prequestion = new QPrequestion("prequestion");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final NumberPath<Long> meetingroomId = createNumber("meetingroomId", Long.class);

    public QPrequestion(String variable) {
        super(Prequestion.class, forVariable(variable));
    }

    public QPrequestion(Path<? extends Prequestion> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPrequestion(PathMetadata metadata) {
        super(Prequestion.class, metadata);
    }

}

