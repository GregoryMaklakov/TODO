const CACHE_KEY = 'todos';
//Cache
import { getTodo } from "./main";

// зберегти дані в кеш (локалсторедж)
function saveToCache(todos) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(todos));
    return todos;
}

// отримати дані з кешу
function getCacheData() {
    const data = localStorage.getItem(CACHE_KEY);
    return JSON.parse(data || "[]");
}

// отримати індекс елемента даних з кеша по id
function getTodoIndxById(todos, id) {
    return todos.findIndex((item) => item.id === id);
}

// змінити елемент даних кеша
function editCacheTodo(id, newData) {
    const todos = getCacheData();
    const idx = getTodoIndxById(todos, id);
    if (idx >= 0) {
        todos[idx] = { ...todos[idx], ...newData };
    }
    saveToCache(todos);
}

// видалити елемент даних кеша
function removeCacheTodo(id) {
    const todos = getCacheData();
    const idx = getTodoIndxById(todos, id);
    if (idx >= 0) {
        todos.splice(idx, 1);
    }
    saveToCache(todos);
}

// отримати дані з кеша чи завантажити по API
async function getOrFetchTodo() {
    const cache = getCacheData();
    if (cache.length) {
        return cache;
    }
    const data = await getTodo();
    return saveToCache(data);
}

//export {getOrFetchTodo, removeCacheTodo, editCacheTodo, saveToCache, getCacheData, getTodoIndxById};
