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

join group
/createNotification/notification POST

POST body

```
1-When reciver student is in group

{
"reciverId": 11925066,
"senderId" : 11925044,
"type" : "request",
"content" : "is requesting to join your group",
"senderType" : "student"
}
```

2-when reciver student is single(without group)

{
"reciverId": 11825033,
"senderId" : 11925044,
"type" : "request",
"content" : "is requesting to join your group",
"senderType" : "student"
}

```
view join Or cancel button
/viewJoinOrCancel/notification?senderId=11925044&receiverId=11923604&joinType=student  GET

```

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

page 4 (choose supervisor)

fetch supervisors
/chooseSupervisor/supervisors?studentId=11925044 GET

---

send request to supervisor
/createNotification/notification POST

POST body

{
"reciverId": 1355,
"senderId" : 11925044,
"type" : "request",
"content" : "is requesting to join your group",
"senderType" :"group"
}

---

view join Or cancel button
/viewJoinOrCancel/notification?senderId=11925022&receiverId=1355&joinType=group GET

---

page 5 (Abstract Submission)
/submission/abstract?studentId=11923604 GET

---

page 6 (Abstract-Comments and Feedbacks)

fetch comments on the abstract
/abstractComments/comments?studentId=11923604 GET

---

page 7 (notifications view)

view notifications
/viewNotifications/notifications?userId=1355 GET

---

delete notification when receiver within group
/deleteNotifications/notification?senderId=11925044&receiverId=11923604 DELETE

---

delete notification when receiver without group
/deleteNotifications/notification?senderId=11925044&receiverId=11825033 DELETE

```

```

```

```
