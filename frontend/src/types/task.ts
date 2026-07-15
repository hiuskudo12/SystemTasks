export interface Task {

    task_id: number;

    title: string;

    description: string;

    status: "pending" | "completed" | "skipped";

    priority: "low" | "medium" | "high";

    deadline: string;

    created_at: string;

}