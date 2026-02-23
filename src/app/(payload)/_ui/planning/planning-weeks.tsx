import { Accordion, AccordionItem } from "@/components/ui/accordion"
import { formatMinutesToHours, getNextWeeks } from "@/lib/planning"
import { OrderCartLine } from "@/types/global"
import { AccordionContent, AccordionTrigger } from "@radix-ui/react-accordion"
import { formatDate } from "date-fns"
import Link from "next/link"
import type { Payload } from "payload"
import { PlanningOrderLine } from "./planning-order-line"
import { PlanningWeekTitle } from "./planning-week-title"
import { PlanningWeeksSetup } from "./planning-weeks-setup"

interface Props {
  payload: Payload
  field: any
}

export const PlanningWeeks = async ({ payload, field }: Props) => {
  return (
    <>
      <div className="mb-5">
        <Accordion type="multiple">
          {getNextWeeks().map(async (week) => {
            const orders = await payload.find({
              collection: "order",
              where: {
                week: {
                  equals: week,
                },
                status: {
                  not_equals: "cancelled",
                },
              },
              limit: 100,
            })

            return (
              <AccordionItem value={week} key={week}>
                <AccordionTrigger className="bg-blue-light w-full cursor-pointer border-none dark:bg-gray-800">
                  <PlanningWeekTitle
                    week={week}
                    path={field.path}
                    totalOrders={orders.totalDocs}
                    worktime={orders.docs.reduce((acc, order) => acc + order.workTime, 0)}
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="bg-grey-light space-y-4 p-4 dark:bg-gray-700">
                    {orders.docs.map(({ customer, detail, date, uid, workTime, id }) => {
                      return (
                        <div
                          key={uid}
                          className="space-y-2 rounded-xl bg-white p-4 dark:bg-gray-600"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/admin/collections/order/${id}`}
                                className="font-semibold"
                                prefetch={false}
                              >
                                Commande {uid}
                              </Link>
                              {/* <div className="rounded bg-white px-2 py-1">Commande {uid}</div> */}
                              <div className="bg-blue-light rounded px-2 py-1 dark:bg-gray-800">
                                {customer}
                              </div>
                              <div className="bg-blue-light rounded px-2 py-1 dark:bg-gray-800">
                                {formatDate(date, "dd/MM/yyyy")}
                              </div>
                              <div className="bg-blue-light rounded px-2 py-1 dark:bg-gray-800">
                                {formatMinutesToHours(workTime)}
                              </div>
                            </div>
                          </div>
                          <div className="">
                            {(detail?.lines as OrderCartLine[])?.map((line, index) => (
                              <PlanningOrderLine line={line} key={index} />
                            ))}

                            {/* <div className="flex items-center gap-2">
                              <div>Couleur :</div>
                              {detail.colors.map(([_, color]) => (
                                <div
                                  key={color}
                                  style={{ backgroundColor: color }}
                                  className="h-4 w-4 rounded-full"
                                />
                              ))}
                            </div>
                            {detail.options.map(([title, value]) => (
                              <div key={title}>
                                {title} : <strong>{value}</strong>
                              </div>
                            ))} */}
                          </div>
                        </div>
                      )
                    })}
                    {orders.docs.length === 0 && <div>Aucune commande pour cette semaine...</div>}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
      <PlanningWeeksSetup path={field.path} />
    </>
  )
}
