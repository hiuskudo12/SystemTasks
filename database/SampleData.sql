INSERT INTO Users
(username,email,password,full_name)

VALUES

(
'admin',

'admin@gmail.com',

'123456',

N'Ho Van Hieu'
);


INSERT INTO Tasks
(
user_id,
title,
description,
status,
priority,
deadline
)

VALUES

(
1,
N'Viết báo cáo',
N'Hoàn thành chương 1',
'pending',
'high',
'2026-08-01 20:00'
),

(
1,
N'Thiết kế Database',
N'Hoàn thành ERD',
'completed',
'medium',
'2026-07-20 18:00'
),

(
1,
N'Học React',
N'Ôn Hook',
'skipped',
'low',
'2026-07-15 22:00'
);
