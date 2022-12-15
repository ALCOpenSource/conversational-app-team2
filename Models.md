## iLearn App

### Data Model

- The application will store Users, and Courses

- Users can have multiple Courses in their dashboard

- Each course can have multiple information

User:

```javascript
{
  userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
  });
}
```

Course:

```javascript
{
  courseSchema = new mongoose.Schema({
    name: { type: String },
    deptCourseId: { type: String },
    description: { type: String },
    subjectCode: {
      code: { type: String },
      school: { type: String },
    },
    registrationNumber: { type: Number },
    code: { type: String },
    instructors: [],
    type: { type: String },
    status: { type: String },
    time: { type: String },
    recitations: [],
    waitlistTotal: { type: Number },
    instructionMode: { type: String },
    campus: { type: String },
    minUnits: { type: Number },
    maxUnits: { type: Number },
    grading: { type: String },
    location: { type: String },
    notes: { type: String },
    prerequisites: { type: String },
    subject: { type: String },
    school: { type: String },
    ID: { type: String },
  });
}
```
