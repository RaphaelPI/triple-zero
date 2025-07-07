"use client"

import { TextInput, useField } from "@payloadcms/ui"
import { useEffect, useRef } from "react"

import { slugify } from "@/lib/slugify"
import { TextField } from "payload"

export type SlugInputProps = TextField & {
  trackingField: string
}

export function SlugInput(props: SlugInputProps) {
  const { trackingField, required, admin: { readOnly } = {} } = props

  const { value: slugValue = "", setValue: setSlugValue } = useField<string>({
    path: "slug",
  })

  const { value: trackingFieldValue } = useField<string>({
    path: trackingField,
  })

  const prevTrackingFieldValueRef = useRef(trackingFieldValue)
  const stopTrackingRef = useRef(false)

  useEffect(() => {
    console.log("trackingFieldValue", trackingFieldValue)
    console.log("prevTrackingFieldValueRef", prevTrackingFieldValueRef)
    if (!trackingField || stopTrackingRef.current) {
      return
    }
    if (trackingFieldValue === prevTrackingFieldValueRef.current) {
      return
    }

    const prevSlugValue = prevTrackingFieldValueRef.current
      ? slugify(prevTrackingFieldValueRef.current)
      : undefined
    prevTrackingFieldValueRef.current = trackingFieldValue
    if (prevSlugValue !== slugValue) {
      return
    }
    setSlugValue(slugify(trackingFieldValue))
  }, [setSlugValue, slugValue, trackingField, trackingFieldValue])

  return (
    <div>
      <TextInput
        path="slug"
        label="Slug"
        hasMany={false}
        description={
          slugValue
            ? `Auto generated based on ${trackingField}`
            : `Will be auto-generated from ${trackingField} when saved`
        }
        value={slugValue}
        onChange={(e) => {
          setSlugValue(e.target.value)
          stopTrackingRef.current = true
        }}
        readOnly={readOnly}
        required={required}
      />
    </div>
  )
}
