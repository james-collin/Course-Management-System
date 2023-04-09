# Database Schemas

## users :

    username (String) (unique- primary key)
    first name ( String)
    last name (String)
    email (String)
    password (String)
    gpa (Float)
    role : (String) ( default student / admin / professor )
    description (Text)
    isTranscriptPending ( Boolean ) default false
    transcript_grades : ( Array(Array [String])) [[CSE102,4.0,3.5,], [CSE105,4.0,3.0]]

## courses :

    course_id (String) (unique-primary key ) ( CSE102)
    title (String)
    description (Text)
    credit (Float)
    isActivated (Boolean) ( true / false )
    prerequisites ( Array(String) ) [CSE102, CSE103…..]

## classes :

    class_id (Number) ( auto increment - unique- primary key )
    course_id (String) [foreign_key] ( CSE102)
    description ( Text)
    username ( String) [foreign_key] >> username of a professor
    schedule [ Range of time ]
    pending_students ( Array (String) ) [ sjessy23, mir_john …]
    approved_students ( Array (String) ) [ jessy23, mir_john …]
    isOnGoing ( Boolean )

## grades :

    grade_id (Number) (auto increment)
    username (String) [foreign_key]
    course_id ( String ) [foreign_key]
    class_id ( Number ) [foreign_key]
    grade (Float)
    credit (Float) [foreign_key]
