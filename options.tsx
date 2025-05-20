import "./assets/style.css"

import { useEffect } from "react"
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form"
import Swal from "sweetalert2"

import { useStorage } from "@plasmohq/storage/hook"

import type { Option } from "./types"

type Field = {
  options: Option[]
  allDisable: boolean
}

function OptionsIndex() {
  const [options, setOptions] = useStorage<Option[]>("options")
  const [allDisable, setAllDisable] = useStorage<boolean>("allDisable")

  const defaultValues = {
    options: options || [],
    allDisable: allDisable || false
  }

  const { control, register, handleSubmit, reset, watch } = useForm<Field>({
    defaultValues
  })

  const watchAllDisable = watch("allDisable", false)

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options"
  })

  useEffect(() => {
    reset({
      options: options || [],
      allDisable: allDisable || false
    })
  }, [options, allDisable, reset])

  const onSubmit: SubmitHandler<Field> = (data) => {
    setOptions(data.options.filter((item) => item.url || item.selector))
    setAllDisable(data.allDisable)

    Swal.fire({
      title: "保存しました",
      icon: "success",
      buttonsStyling: false
    })
  }

  const handleRemove = (index: number) => {
    Swal.fire({
      title: "削除しますか？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        remove(index)
        Swal.fire({
          title: "削除しました",
          icon: "success",
          buttonsStyling: false
        })
      }
    })
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "1fr",
        placeContent: "center",
        width: "100vw",
        height: "100vh",
        alignItems: "stretch",
        paddingInline: "2rem"
      }}>
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <fieldset style={{ display: watchAllDisable ? "none" : "block" }}>
          {fields.length > 0 ? (
            <>
              <div className="row">
                <div className="six columns">URL (前方一致)</div>
                <div className="five columns">
                  Selector (#id, .class, [type="date"] など)
                </div>
                <div className="one column">Remove</div>
              </div>
              {fields.map((field, index) => (
                <div key={field.id} className="row">
                  <div className="six columns">
                    <input
                      type="text"
                      {...register(`options.${index}.url`)}
                      className="u-full-width"
                    />
                  </div>
                  <div className="five columns">
                    <input
                      type="text"
                      {...register(`options.${index}.selector`)}
                      className="u-full-width"
                    />
                  </div>
                  <div className="one column">
                    <button type="button" onClick={() => handleRemove(index)}>
                      remove
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>↓「ADD SITE」ボタンを押して設定したいサイトを追加してください</p>
          )}
          <div>
            <button
              type="button"
              onClick={() => append({ url: "", selector: "" })}>
              add site
            </button>
          </div>
        </fieldset>
        <fieldset>
          <label>
            <input type="checkbox" {...register("allDisable")} />
            <strong>すべてのサイトのすべての入力欄で無効化する</strong>
          </label>
        </fieldset>
        <button type="submit" className="button-primary">
          save
        </button>
      </form>
    </div>
  )
}

export default OptionsIndex
