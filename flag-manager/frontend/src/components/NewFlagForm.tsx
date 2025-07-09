import { useForm } from "react-hook-form";

const NewFlagForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Flag Name" {...register("Flag Name", {required: true, max: 150, min: 1})} />
      <select {...register("Flag Type", { required: true })}>
        <option value="string">string</option>
        <option value="boolean">boolean</option>
        <option value="number">number</option>
        <option value="object">object</option>
      </select>
      <input type="text" placeholder="Variants" {...register("Variants", {required: true})} />
      <input type="text" placeholder="Default Variant" {...register("Default Variant", {required: true})} />

      <input {...register("Enabled")} type="radio" value="false" />
      <input {...register("Enabled")} type="radio" value="true" />

      <input type="submit" />
    </form>
  )
}

export default NewFlagForm;