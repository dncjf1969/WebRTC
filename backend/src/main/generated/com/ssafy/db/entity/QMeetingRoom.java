package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QMeetingRoom is a Querydsl query type for MeetingRoom
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QMeetingRoom extends EntityPathBase<MeetingRoom> {

    private static final long serialVersionUID = 116793524L;

    public static final QMeetingRoom meetingRoom = new QMeetingRoom("meetingRoom");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final DatePath<java.sql.Date> date = createDate("date", java.sql.Date.class);

    public final StringPath director1 = createString("director1");

    public final StringPath director2 = createString("director2");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath memeber1 = createString("memeber1");

    public final StringPath memeber2 = createString("memeber2");

    public final StringPath memeber3 = createString("memeber3");

    public final StringPath memeber4 = createString("memeber4");

    public final StringPath memeber5 = createString("memeber5");

    public final StringPath memeber6 = createString("memeber6");

    public final TimePath<java.sql.Time> time = createTime("time", java.sql.Time.class);

    public final NumberPath<Long> waitingroomId = createNumber("waitingroomId", Long.class);

    public QMeetingRoom(String variable) {
        super(MeetingRoom.class, forVariable(variable));
    }

    public QMeetingRoom(Path<? extends MeetingRoom> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMeetingRoom(PathMetadata metadata) {
        super(MeetingRoom.class, metadata);
    }

}

