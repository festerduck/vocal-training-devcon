```ts
User {
    fullName            string
    userId              string
    Role                enum ("admin", "instructor", "student")
    student?            Student
    instructor?         Instructor
}

Student {
    studentId            string
    user                 User
    enrolledCourses?     Enrollment[]
    recordings?          Recording[]
}

Enrollment {
    progressCompletion  string
    student             Student
    course              Course
}

Instructor {
    instructorId        string
    user                User
    createdCourses?      Course[]
    feedback?            Feedback[]
}

Course {
    courseId            string
    courseName          string
    courseDescription   string
    courseLessons       Lesson[]
    studentEnrolled?     Enrollment[]
    courseInstructor    Instructor
    courseRecordings?    Recording[]
}

Lesson {
    lessonId            string
    lessonName          string
    lessonDescription   string
    video?              blob[]
    audio?              blob[]
    practiceGuide?      string
    course              Course
}

Recording {
    recordingId         string
    track               Track
    student             Student
    course              Course
    feedback?           Feedback
}

Track {
    trackId             string
    trackContent        blob
}

Certificate {
    certificateId   string
    course          Course
    student         Student
}

FeedBack {
    feedbackId      string
    feedbackStars   int
    description     string
    instructor      Instructor
    recording       Recording

}
```
