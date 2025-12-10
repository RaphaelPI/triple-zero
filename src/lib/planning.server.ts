import { isBefore } from "date-fns"
import { getClient } from "./payload"
import { getNextWeeks } from "./planning"

export const getNextAvailableWeek = async (orderWorkTime: number) => {
  const payload = await getClient()

  // Calculate production week
  const planning = await payload.findGlobal({
    slug: "planning",
  })

  if (!planning) {
    throw new Error("No planning has been found")
  }

  const productionWeeks = planning.weeks as Record<string, number>

  let orderWeek = await findAsyncSequential(getNextWeeks(), async (planningWeek) => {
    if (!isDateValid(planningWeek)) {
      return false
    }

    const weekWorkTime = productionWeeks[planningWeek] ?? planning.defaultWorktime
    const weekOrders = await payload.find({
      collection: "order",
      where: {
        week: {
          equals: planningWeek,
        },
      },
    })

    const ordersWeekWorktime = weekOrders.docs.reduce((acc, order) => acc + order.workTime, 0)
    const weekWorktimeRemaining = Math.round(weekWorkTime - ordersWeekWorktime / 60)

    if (weekWorktimeRemaining >= orderWorkTime / 60) {
      return true
    }

    return false
  })

  // If no week has been found, return the first empty one
  if (!orderWeek) {
    orderWeek = await findAsyncSequential(getNextWeeks(), async (planningWeek) => {
      if (!isDateValid(planningWeek)) {
        return false
      }

      const weekOrders = await payload.find({
        collection: "order",
        where: {
          week: {
            equals: planningWeek,
          },
        },
      })

      const ordersWeekWorktime = weekOrders.docs.reduce((acc, order) => acc + order.workTime, 0)
      if (ordersWeekWorktime === 0) {
        return true
      }

      return false
    })
  }

  return orderWeek
}

async function findAsyncSequential<T>(
  array: T[],
  predicate: (t: T) => Promise<boolean>,
): Promise<T | undefined> {
  for (const t of array) {
    if (await predicate(t)) {
      return t
    }
  }
  return undefined
}

const isDateValid = (date: string) => {
  const dateString = `${date.split("/")[2]}-${date.split("/")[1]}-${date.split("/")[0]}T12:00:00.000Z`
  if (isBefore(new Date(dateString), new Date())) {
    return false
  }

  return true
}
