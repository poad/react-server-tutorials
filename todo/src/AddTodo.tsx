import { useActionState } from '@lazarv/react-server/router';
import type { $ZodIssue as ZodIssue } from '@zod/core';

import { addTodo } from './actions.js';

export default function AddTodo() {
  const { formData, error } = useActionState<
    typeof addTodo,
    string & Error & ZodIssue[]
  >(addTodo);

  return (
    <form action={addTodo} className="mb-4 flex flex-col">
      <div className="flex flex-row">
        <input
          name="title"
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 mb-2 mr-2"
          defaultValue={formData?.get?.('title') as string}
          autoFocus
        />
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2 mb-2 text-center w-fit block"
          type="submit"
        >
          Submit
        </button>
      </div>
      <div className="flex flex-row">
        {error?.map?.(({ message }, i) => (
          <p
            key={i}
            className="bg-red-50 border rounded-lg border-red-500 text-red-500 p-2.5 mb-2"
          >
            {message}
          </p>
        )) ??
          (error && (
            <p className="bg-red-50 border rounded-lg border-red-500 text-red-500 p-2.5">
              {error}
            </p>
          ))}
      </div>
    </form>
  );
}
