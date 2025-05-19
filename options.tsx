import { useEffect, useState } from "react"
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

import { useStorage } from "@plasmohq/storage/hook"

import type { Option } from "./types"

type Field = {
  options: Option[]
}

function OptionsIndex() {
  const [options, setOptions] = useStorage<Option[]>("options")
  const [mounted, onMounted] = useState(false)

  const { control, register, handleSubmit } = useForm<Field>({
    defaultValues: {
      options
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options"
  })

  useEffect(() => {
    if (mounted || !options) return
    console.log("options", options)
    options?.forEach((option) => append(option))
    onMounted(true)
  }, [options, mounted, append])

  const onSubmit: SubmitHandler<Field> = (data) => {
    setOptions(data.options.filter((item) => item.url || item.selector))

    withReactContent(Swal).fire({
      title: "Saved",
      text: "Your settings have been saved.",
      icon: "success"
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul>
        {fields.map((field, index) => (
          <li key={field.id}>
            <input type="text" {...register(`options.${index}.url`)} />
            <input type="text" {...register(`options.${index}.selector`)} />
            <button type="button" onClick={() => remove(index)}>
              -
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => append({ url: "", selector: "" })}>
        +
      </button>
      <div>
        <button type="submit" {...register("submit")} value="submit">
          Save
        </button>
      </div>
    </form>
  )
}

export default OptionsIndex
