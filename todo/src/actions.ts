"use server";

import { redirect } from "@lazarv/react-server";
import * as zod from "zod";
import { v7 as uuidv7 } from 'uuid';
import kv from "polystore";

type Todo = {
  id: string;
  title: string;
};

const storage = kv(new Map());

const addTodoSchema = zod.object({
  title: zod
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters")
    .refine((value) => value.length > 0, "Title is required")
    .transform((value) => value.trim()),
});

const deleteTodoSchema = zod.object({
  id: zod.string().transform((value) => value.trim()),
});

export async function addTodo(formData: FormData) {
  const result = addTodoSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    throw result.error.issues;
  }

  const { title } = result.data;
  const id = uuidv7();
  await storage.set(id, title);
  redirect("/");
}

export async function allTodos(): Promise<Todo[]> {
  const keys = await storage.keys();
  const todos = await Promise.all(keys.map(async (key) => {
    const title = await storage.get(key);
    return {
      id: key,
      title: title?.toString() ?? '',
    };
  }));
  return todos ?? [];
}

export async function deleteTodo(formData: FormData) {
  const result = deleteTodoSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    throw result.error.issues;
  }

  const { id } = result.data;
  storage.del(id);
  redirect("/");
}
