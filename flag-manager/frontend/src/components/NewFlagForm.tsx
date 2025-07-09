import { useForm } from "react-hook-form";

const NewFlagForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Enabled: "false", // default selection for radio
    },
  });
  const onSubmit = data => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Flag Configuration</legend>
        
        <div>
          <label htmlFor="flag-name">Flag Name</label>
          <input 
            id="flag-name"
            type="text" 
            placeholder="Flag Name" 
            {...register("Flag Name", {required: true, max: 150, min: 1})} 
          />
        </div>

        <div>
          <label htmlFor="flag-type">Flag Type</label>
          <select id="flag-type" {...register("Flag Type", { required: true })}>
            <option value="string">string</option>
            <option value="boolean">boolean</option>
            <option value="number">number</option>
            <option value="object">object</option>
          </select>
        </div>

        <div>
          <label htmlFor="variants">Variants</label>
          <input 
            id="variants"
            type="text" 
            placeholder="Variants" 
            {...register("Variants", {required: true})} 
          />
        </div>

        <div>
          <label htmlFor="default-variant">Default</label>
          <input 
            id="default-variant"
            type="text" 
            placeholder="Default Variant" 
            {...register("Default Variant", {required: true})} 
          />
        </div>

      </fieldset>

      <fieldset>
        <legend>Enabled</legend>
        <div>
          <input 
            type="radio" 
            id="enabled-true"
            value="true" 
            {...register("Enabled")}
          />
          <label htmlFor="enabled-true">True</label>
        </div>
        <div>
          <input 
            type="radio" 
            id="enabled-false"
            value="false" 
            {...register("Enabled")} 
          />
          <label htmlFor="enabled-false">False</label>
        </div>
      </fieldset>

      <div>
        <input type="submit" value="Submit" />
      </div>

    </form>
  )
}

export default NewFlagForm;