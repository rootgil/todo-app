import axios from "axios";
const apiUrl = "http://localhost:3000/todo"

export async function getTasks() {
    return await axios.get(apiUrl)
}

export async function addTask(task: string) {
    return await axios.post(apiUrl, {text: task})
} 

export async function updateTask(id: number, done: boolean) {
    return await axios.put(apiUrl+'/'+String(id), {done: done})
}

export async function deleteTask(id: number) {
    return await axios.delete(apiUrl + "/" + String(id))
}