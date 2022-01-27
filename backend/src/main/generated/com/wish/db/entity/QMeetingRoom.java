package com.wish.db.entity;

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

    private static final long serialVersionUID = 331383297L;

    public static final QMeetingRoom meetingRoom = new QMeetingRoom("meetingRoom");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final DatePath<java.sql.Date> date = createDate("date", java.sql.Date.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final NumberPath<Integer> numberInterviewer = createNumber("numberInterviewer", Integer.class);

    public final NumberPath<Integer> numberMember = createNumber("numberMember", Integer.class);

    public final TimePath<java.sql.Time> startTime = createTime("startTime", java.sql.Time.class);

    public final TimePath<java.sql.Time> takenTime = createTime("takenTime", java.sql.Time.class);

    public final StringPath type = createString("type");

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

