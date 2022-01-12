package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QTest2 is a Querydsl query type for Test2
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTest2 extends EntityPathBase<Test2> {

    private static final long serialVersionUID = 471685982L;

    public static final QTest2 test2 = new QTest2("test2");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final NumberPath<Integer> age = createNumber("age", Integer.class);

    public final StringPath email = createString("email");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath name = createString("name");

    public QTest2(String variable) {
        super(Test2.class, forVariable(variable));
    }

    public QTest2(Path<? extends Test2> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTest2(PathMetadata metadata) {
        super(Test2.class, metadata);
    }

}

