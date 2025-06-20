// src/apis/expenseApi.js
import axiosInstance from "./axiosInstance";

// Expense Routes
export const getAllExpenses = () => axiosInstance.get("/expenses");
export const getExpenseById = (id) => axiosInstance.get(`/expense/${id}`);
export const addExpense = (data) => axiosInstance.post("/expense", data);
export const updateExpense = (id, data) => axiosInstance.put(`/expense/${id}`, data);
export const deleteExpense = (id) => axiosInstance.delete(`/expense/${id}`);

// Budget Routes
export const getAllBudgets = () => axiosInstance.get("/budgets");
export const addBudget = (data) => axiosInstance.post("/budget", data);
export const updateBudget = (id, data) => axiosInstance.put(`/budget/${id}`, data);
export const deleteBudget = (id) => axiosInstance.delete(`/budget/${id}`);
export const getBudgetById = (id) => axiosInstance.get(`/budget/${id}`);

// category routes
export const  getAllCats=()=> axiosInstance.get("/categories");