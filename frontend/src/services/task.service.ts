import api from "@/lib/axios";

export const getTasks = async () => {
    const res = await api.get("/tasks");
    return res.data;
};

export const getTaskById = async (id: number) => {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
};

export const createTask = async (data: any) => {
    const res = await api.post("/tasks", data);
    return res.data;
};

export const updateTask = async (
    id: number,
    data: any
) => {
    const res = await api.put(`/tasks/${id}`, data);
    return res.data;
};

export const updateStatus = async (
    id: number,
    status: string
) => {

    const res = await api.patch(
        `/tasks/${id}/status`,
        {
            status,
        }
    );

    return res.data;

};

export const deleteTask = async (id: number) => {
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
};