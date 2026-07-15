
.env - backend
PORT=5000

DB_USER=sa
DB_PASSWORD=123
DB_SERVER=localhost
DB_NAME=TaskReminderDB

JWT_SECRET=task_reminder_secret_key

Bước 1: Di chuyển vào thư mục dự án
Mở Terminal/Command Prompt lên và di chuyển vào thư mục dự án vừa clone về:

Bash
cd SystemTasks
Bước 2: Cài đặt lại các thư viện (Dependencies)
Đây là bước quan trọng nhất. Bạn cần khôi phục lại thư mục node_modules cho cả frontend và backend dựa trên danh sách thư viện đã được khai báo sẵn trong file package.json.

Đối với thư mục frontend:

Bash
cd frontend
npm install        # Hoặc yarn install / pnpm install (tùy thuộc vào công cụ bạn dùng)
cd ..              # Quay lại thư mục gốc sau khi cài xong
Đối với thư mục backend:

Bash
cd backend
npm install        # Cài đặt thư viện cho backend
cd ..              # Quay lại thư mục gốc
Bước 3: Tạo lại file cấu hình môi trường .env (Nếu có)
Vì các file .env chứa mật khẩu database, tài khoản gửi mail Gmail,... đã bị chặn không cho lên GitHub để bảo mật, nên bạn phải tự tạo lại file này thủ công:

Vào thư mục backend/ (hoặc nơi bạn cấu hình môi trường).

Tạo mới một file tên là .env.

Điền lại các thông số cấu hình cần thiết (Ví dụ: PORT=5000, DATABASE_URL=..., GMAIL_APP_PASSWORD=...).
(Kinh nghiệm: Trong dự án, bạn nên tạo sẵn một file tên là .env.example chứa các tên biến trống để khi clone về, bạn chỉ cần copy ra thành .env rồi điền giá trị vào).

Bước 4: Khởi động dự án và tiếp tục code
Sau khi đã cài xong thư viện và cấu hình đầy đủ, bạn có thể khởi động dự án lên để chạy thử:

Chạy frontend: Chạy lệnh khởi động (ví dụ: npm run dev hoặc npm start tùy cấu hình) trong thư mục frontend.

Chạy backend: Chạy lệnh khởi động (ví dụ: npm run dev hoặc node server.js) trong thư mục backend.

Mọi thứ sẽ hoạt động trơn tru giống hệt như lúc bạn đang viết code trên máy cũ!