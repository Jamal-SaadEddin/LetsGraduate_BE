page 1

create prerequisite
/prerequisites/add POST

```
{
    "prerequisiteId": 1,
    "department": "Computer Engineering",
    "projectType":"gp1",
    "content":"Did you finish 120 hours?",
}
```

---

fetch prerequisite by department and projectType GET
/prerequisites/filter?department=Computer%20Engineering&projectType=gp1

---

delete prerequisite DELETE
/prerequisites/delete?prerequisiteId=2

---

page 2 (Find Partners)

fetch students with groups
/findPartners1/findGroups?department=Computer%20Engineering&projectType=gp1 GET

---

fetch students without groups
/findPartners2/studentsNotJoined?department=Computer%20Engineering&projectType=gp1 GET

---

page 3 (My project info)

fetch partners
/students/findMyPartners?studentId=11925044 GET

---

fetch supervisor or supervisors for student
/doctors/findMySupervisorOrSupervisors?studentId=11925044 GET

---

fetch project title and type
/projects/fetchProject/11925044 GET

---

update project title
/projects/editTitle/11925044 PUT

---
