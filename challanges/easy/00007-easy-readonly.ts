/*
  7 - Readonly
  -------
  by Anthony Fu (@antfu) #easy #built-in #readonly #object-keys

  ### Question

  Implement the built-in `Readonly<T>` generic without using it.

  Constructs a type with all properties of T set to readonly, meaning the properties of the constructed type cannot be reassigned.

  For example:

  ```ts
  interface Todo {
    title: string
    description: string
  }

  const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar"
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  ```

  > View on GitHub: https://tsch.js.org/7
*/

/* _____________ Your Code Here _____________ */
// Adds readonly to the first level of TObject
type MyReadonly<TObject> = {
	readonly [TKey in keyof TObject]: TObject[TKey];
};

// Adds readonly to as many levels as TObject goes. And does so recursively. Cursed?
// This doesn't work completly as there are not enoght guardrails .Ex: Date, null, array.
type MyReadonlyRecursive<TObject> = {
	readonly [TKey in keyof TObject]: TObject[TKey] extends object
		? MyReadonlyRecursive<TObject[TKey]>
		: TObject[TKey];
};

type redable_type_1 = MyReadonly<Todo1>;
type redable_type_2 = MyReadonlyRecursive<Todo1>;
type redable_type_3 = MyReadonlyRecursive<Todo2>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

interface Todo1 {
	title: string;
	description: string;
	completed: boolean;
	meta: {
		author: string;
	};
}
interface Todo2 {
	title: string;
	description: string;
	completed: boolean;
	meta: {
		author: {
			name: string;
			age: number;
		};
	};
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/7/answer
  > View solutions: https://tsch.js.org/7/solutions
  > More Challenges: https://tsch.js.org
*/
