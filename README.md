page 1

create prerequisite
/prerequisites/add POST

---

{
"prerequisiteId": 1,
"department": "Computer Engineering",
"projectType":"gp1",
"content":"Did you finish 120 hours?",
}

---

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

---

1-When reciver student is in group

{
"reciverId": 11925066,
"senderId" : 11925044,
"type" : "request",
"content" : "is requesting to join your group",
"senderType" : "student"
}

---

2-when reciver student is single(without group)

{
"reciverId": 11825033,
"senderId" : 11925044,
"type" : "request",
"content" : "is requesting to join your group",
"senderType" : "student"
}

---

view join Or cancel button
/viewJoinOrCancel/notification?senderId=11925044&receiverId=11923604&joinType=group GET

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
/viewJoinOrCancel/notification?senderId=11925022&receiverId=1355&joinType=supervisor GET

---

page 5 (Abstract Submission)
/submission/abstract?studentId=11923604 GET

---

page 6 (Abstract-Comments and Feedbacks)

fetch comments on the abstract
/abstractComments/comments?id=11923604 GET

---

page 7 (notifications view)

view notifications
/viewNotifications/notifications?userId=1355 GET

---

delete notification when receiver within group
/deleteNotifications/notification?senderId=11925044&receiverId=11923604&joinType=group DELETE

---

delete notification when receiver without group
/deleteNotifications/notification?senderId=11925044&receiverId=11825033&joinType=group DELETE

delete notification sent to supervisor
/deleteNotifications/notification?senderId=11923604&receiverId=1355&joinType=supervisor DELETE

---

page 8 (view profile)

view student info
/students/viewProfile?studentId=11923604 GET

---

page 9 (update student profile info)

update student profile info
/students/updateProfile PUT

PUT body

{
"studentId": 11925044,
"firstName" : "Omar",
"lastName" : "Qaneer",
"address" : "Nablus",
"mobileNumber" :"0594656980"
}

---

page 10 (update student password)

update student password
/users/updatePassword PUT

PUT body

{
"userId": 11924066,
"oldPassword" : "123456",
"newPassword" : "654321"
}

---

page 11 (register project)

register project
/registerProject/project PUT

PUT body

{
"studentId": 11823055,
"projectType" : "gp1"
}

---

page 12 (delete account)

delete account
/deleteAccount/account?userId=11725044 DELETE

---

---

---

---

---

doctor pages

page 1 (My groups)

find my groups
/findMyGroups/groups?doctorId=1355 GET

---

page 2 abstract submissions

fetch submissions for viewing or evaluating
/abstractSubmissions/submissions?doctorId=1355 GET

---

update abstract submission status
/abstractSubmissions/editStatus?projectId=1 PUT

---

page 3 create comment

/createComment/comment POST

POST body

{
"doctorId": 1377,
"projectId" : 2,
"content" : "add another features on your project"
}

---

get all comments on abstract
/abstractComments/comments?id=1 GET

---
