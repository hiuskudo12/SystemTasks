exports.generateReminderEmail = (username, tasks) => {

    const taskList = tasks.map(task => `
        <tr>
            <td style="padding:10px;border:1px solid #ddd;">
                ${task.title}
            </td>

            <td style="padding:10px;border:1px solid #ddd;">
                ${task.priority}
            </td>

            <td style="padding:10px;border:1px solid #ddd;">
                ${new Date(task.deadline).toLocaleString("vi-VN")}
            </td>
        </tr>
    `).join("");

    return `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

</head>

<body
style="
font-family:Arial;
background:#f4f4f4;
padding:40px;
">

<div
style="
max-width:700px;
margin:auto;
background:white;
padding:30px;
border-radius:12px;
">

<h2 style="color:#2563eb;">

📌 HỆ THỐNG NHẮC CÔNG VIỆC

</h2>

<p>

Xin chào

<b>${username}</b>

👋

</p>

<p>

Bạn có

<b>${tasks.length}</b>

công việc cần thực hiện.

</p>

<table
style="
width:100%;
border-collapse:collapse;
">

<tr
style="
background:#2563eb;
color:white;
">

<th>Tiêu đề</th>

<th>Ưu tiên</th>

<th>Hạn</th>

</tr>

${taskList}

</table>

<p
style="
margin-top:30px;
">

Chúc bạn có một ngày làm việc hiệu quả!

</p>

<hr>

<small>

Personal Task Reminder System

</small>

</div>

</body>

</html>

`;

};