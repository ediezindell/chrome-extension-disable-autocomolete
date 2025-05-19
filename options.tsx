import { useEffect, useState } from "react"
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

import { useStorage } from "@plasmohq/storage/hook"

type Options = {
  settings: {
    url: string
    selector: string
  }[]
}

function OptionsIndex() {
  const [options, setOptions] = useStorage<Options>("options")
  const [mounted, onMounted] = useState(false)

  const { control, register, handleSubmit } = useForm<
    Options & { submit?: string }
  >({
    defaultValues: options
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "settings"
  })

  useEffect(() => {
    if (mounted || !options) return
    options.settings.forEach((setting) => append(setting))
    onMounted(true)
  }, [options, mounted, append])

  const onSubmit: SubmitHandler<Options & { submit?: string }> = (data) => {
    if (!data?.submit) return
    setOptions({
      settings: data.settings.filter((item) => item.url || item.selector)
    })

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
            <input type="text" {...register(`settings.${index}.url`)} />
            <input type="text" {...register(`settings.${index}.selector`)} />
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
