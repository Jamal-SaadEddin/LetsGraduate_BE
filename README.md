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

page 3

fetch partners
/students/findMyPartners?studentId=11925044 GET
