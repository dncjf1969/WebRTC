package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QWaitingRoom is a Querydsl query type for WaitingRoom
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QWaitingRoom extends EntityPathBase<WaitingRoom> {

    private static final long serialVersionUID = 1473319878L;

    public static final QWaitingRoom waitingRoom = new QWaitingRoom("waitingRoom");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final NumberPath<Integer> count = createNumber("count", Integer.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath manager = createString("manager");

    public final NumberPath<Integer> maxMember = createNumber("maxMember", Integer.class);

    public final StringPath memeber1 = createString("memeber1");

    public final StringPath memeber2 = createString("memeber2");

    public final StringPath memeber3 = createString("memeber3");

    public final StringPath memeber4 = createString("memeber4");

    public final StringPath memeber5 = createString("memeber5");

    public final StringPath memeber6 = createString("memeber6");

    public final StringPath name = createString("name");

    public final NumberPath<Integer> password = createNumber("password", Integer.class);

    public final StringPath type = createString("type");

    public QWaitingRoom(String variable) {
        super(WaitingRoom.class, forVariable(variable));
    }

    public QWaitingRoom(Path<? extends WaitingRoom> path) {
        super(path.getType(), path.getMetadata());
    }

    public QWaitingRoom(PathMetadata metadata) {
        super(WaitingRoom.class, metadata);
    }

}

