"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UpdateInventoryForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <Input defaultValue="test" {...register("example")} />

      {/* include validation with required or other standard HTML validation rules */}
      <Input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && (
        <span className="text-red-600">This field is required</span>
      )}

      <Button type="submit">Submit </Button>
    </form>
  );
};

export default UpdateInventoryForm;
