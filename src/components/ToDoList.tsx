import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import {
  categoryState,
  toDoSelector,
  customCategories,
  Categories,
} from "./atoms";
import ToDo from "./ToDo";
import CreateCustomCategories from "./CreateCustomCategories";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const customCategory = useRecoilValue(customCategories);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>TO Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {customCategory?.map((item) => (
          <option value={item}>{item} </option>
        ))}
      </select>
      <div>
        <CreateCustomCategories />
        <CreateToDo />
      </div>
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

// interface IForm {
//   email: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   password: string;
//   password_confirm: string;
//   extraError?: string;
// }
// // 타입스크립트에 의해 데이터 타입을 보호받기위히서 작성한 interface

// function ToDoList() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<IForm>({
//     defaultValues: {
//       email: "@naver.com",
//       // 여기에 @naver.com이라고 설정하면 기본 값으로 @naver.com이 박혀서 나옴
//     },
//   });
//   const onValid = (data: IForm) => {
//     if (data.password !== data.password_confirm) {
//       setError(
//         "password_confirm",
//         { message: "Password are not the same" },
//         { shouldFocus: true }
//       );
//     }
//     // setError("extraError", { message: "Server offline" });
//   };
//   console.log(errors);

//   return (
//     <div>
//       <form
//         style={{ display: "flex", flexDirection: "column" }}
//         onSubmit={handleSubmit(onValid)}
//       >
//         <input
//           {...register("email", {
//             required: "Email is Required",
//             // 오류 메시지를 출력하는 1번 방법
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//               message: "Only naver.com emails allowed",
//             },
//           })}
//           placeholder="Email"
//         />
//         <span>{errors?.email?.message}</span>
//         <input
//           {...register("firstName", {
//             required: true,
//             validate: (value) =>
//               value.includes("nico") ? "no nicos allowed" : true,
//           })}
//           placeholder="First Name"
//         />
//         <span>{errors?.firstName?.message}</span>
//         <input
//           {...register("lastName", { required: true })}
//           placeholder="Last Name"
//         />
//         <span>{errors?.lastName?.message}</span>
//         <input
//           {...register("username", { required: true, minLength: 10 })}
//           placeholder="Username"
//         />
//         <span>{errors?.username?.message}</span>
//         <input
//           {...register("password", {
//             required: true,
//             minLength: {
//               value: 5,
//               message: "님 비번 쥰내 짧음",
//               // 오류 메시지를 출력하는 2번 방법
//             },
//           })}
//           placeholder="Password"
//         />
//         <span>{errors?.password?.message}</span>
//         <input
//           {...register("password_confirm", {
//             required: "Password is required",
//             minLength: {
//               value: 5,
//               message: "what?",
//             },
//           })}
//           placeholder="Password confirm"
//         />
//         <span>{errors?.password_confirm?.message}</span>
//         <button>Add</button>
//         <span>{errors?.extraError?.message}</span>
//       </form>
//     </div>
//   );
//   // react-hook-form에서 문자열을 리턴하면, 그건 내가 에러 메시지를 리턴한다는 뜻
// }
export default ToDoList;
