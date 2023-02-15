import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, customCategories, toDoState } from "./atoms";

interface IForm {
  categories: string;
}

function CreateCustomCategories() {
  const setToDos = useSetRecoilState(toDoState);
  const setCustomValue = useSetRecoilState(customCategories);
  const category = useRecoilValue(categoryState);

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ categories }: IForm) => {
    setCustomValue((prev) => [...prev, categories]);
    setValue("categories", "");
  };
  console.log(category, "category");
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("categories", {
          required: "Please write custom categories",
        })}
        placeholder="Write a custom category"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateCustomCategories;
