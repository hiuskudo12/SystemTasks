CREATE DATABASE TaskReminderDB;
GO

USE TaskReminderDB;
GO

CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,

    username VARCHAR(50) NOT NULL UNIQUE,

    email VARCHAR(100) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    full_name NVARCHAR(100) NOT NULL,

    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Tasks (

    task_id INT IDENTITY(1,1) PRIMARY KEY,

    user_id INT NOT NULL,

    title NVARCHAR(200) NOT NULL,

    description NVARCHAR(MAX),

    status VARCHAR(20)
        DEFAULT 'pending'
        CHECK(status IN ('pending','completed','skipped')),

    priority VARCHAR(20)
        DEFAULT 'medium'
        CHECK(priority IN ('low','medium','high')),

    deadline DATETIME NOT NULL,

    created_at DATETIME DEFAULT GETDATE(),

    updated_at DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Task_User
        FOREIGN KEY(user_id)
        REFERENCES Users(user_id)
        ON DELETE CASCADE
);