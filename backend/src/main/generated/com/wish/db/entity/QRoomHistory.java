package com.wish.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QRoomHistory is a Querydsl query type for RoomHistory
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QRoomHistory extends EntityPathBase<RoomHistory> {

    private static final long serialVersionUID = -1591920764L;

    public static final QRoomHistory roomHistory = new QRoomHistory("roomHistory");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final NumberPath<Long> meetingroomId = createNumber("meetingroomId", Long.class);

    public final StringPath memberId = createString("memberId");

    public final StringPath role = createString("role");

    public QRoomHistory(String variable) {
        super(RoomHistory.class, forVariable(variable));
    }

    public QRoomHistory(Path<? extends RoomHistory> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRoomHistory(PathMetadata metadata) {
        super(RoomHistory.class, metadata);
    }

}

