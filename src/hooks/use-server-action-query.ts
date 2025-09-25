import { useCallback, useEffect, useState } from "react"
import {
  inferServerActionInput,
  inferServerActionReturnData,
  TAnyZodSafeFunctionHandler,
} from "zsa"
import { useServerAction } from "zsa-react"

export function useServerActionQuery<const TServerAction extends TAnyZodSafeFunctionHandler>(
  action: TServerAction,
  initialVariables?: inferServerActionInput<TServerAction>,
  {
    skip,
    ...options
  }: Parameters<typeof useServerAction<TServerAction>>[1] & {
    skip?: boolean
  } = {},
) {
  const {
    data,
    error,
    isPending,
    execute: zsaExecute,
  } = useServerAction(action, {
    persistDataWhilePending: true,
    ...options,
  })
  const [initialLoading, setInitialLoading] = useState(!skip)

  const dep = JSON.stringify(initialVariables)

  useEffect(() => {
    if (skip) {
      return
    }

    setInitialLoading(true)
    // @ts-expect-error TODO: fix this
    zsaExecute(initialVariables).finally(() => setInitialLoading(false))
  }, [action, dep, skip]) // eslint-disable-line react-hooks/exhaustive-deps

  const execute = useCallback(
    async (variables?: inferServerActionInput<TServerAction>) => {
      // @ts-expect-error TODO: fix this (and handle error?)
      const [response] = await zsaExecute(variables ?? initialVariables)
      return response as inferServerActionReturnData<TServerAction>
    },
    [action, dep], // eslint-disable-line react-hooks/exhaustive-deps
  )

  return {
    isPending: isPending || initialLoading,
    error,
    data,
    execute,
  }
}
