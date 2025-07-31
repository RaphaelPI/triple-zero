"use client"

import COUNTRIES_FR from "@/data/countries-fr"
import { formatAmount } from "@/lib/text"
import { CartLine, formSchema } from "@/providers/checkout/checkout"
import { Button, useAllFormFields, useField } from "@payloadcms/ui"
import { format } from "date-fns"
import { reduceFieldsToValues } from "payload/shared"
import { z } from "zod"

interface OrderCartLine extends CartLine {
  unitPrice: number
}

interface Props {
  path: string
}

export const OrderDetail = ({ path }: Props) => {
  const { value } = useField<CartLine[]>({ path })
  const [fields, dispatchFields] = useAllFormFields()

  // Pass in fields, and indicate if you'd like to "unflatten" field data.
  // The result below will reflect the data stored in the form at the given time
  const formData = reduceFieldsToValues(fields, true)
  const label = <div>Détail de la commande</div>

  if (!value || value.length === 0) {
    return (
      <div>
        {label}
        <div className="opacity-50">Cette commande est vide...</div>
      </div>
    )
  }

  const deliveryData = formData.detail.deliveryData as z.infer<typeof formSchema>
  const lines = formData.detail.lines as OrderCartLine[]
  console.log(formData)
  const country = Object.values(COUNTRIES_FR).find((c) => c[deliveryData.country])?.[
    deliveryData.country
  ]
  const d_country = deliveryData.d_country
    ? Object.values(COUNTRIES_FR).find((c) => c[String(deliveryData.d_country)])?.[
        deliveryData.d_country
      ]
    : country

  return (
    <div className="space-y-4">
      {label}
      <div className="text-center">
        <Button
          onClick={() => {
            const table = document.getElementById("order-detail")
            if (table) {
              const printWindow = window.open("", "_blank")
              printWindow?.document.write(table.outerHTML)
              printWindow?.document.close()
              printWindow?.print()
              printWindow?.close()
            }
          }}
        >
          Imprimer
        </Button>
      </div>
      <table
        width="680"
        border={0}
        cellPadding={0}
        cellSpacing={0}
        align="center"
        id="order-detail"
      >
        <tbody>
          {/* <tr>
            <td width="680" height="50" align="center" valign="middle">
              <table width="680" border={0} cellSpacing={0} cellPadding={0}>
                <tbody>
                  <tr>
                    <td width="220" height="25" align="left" valign="bottom">
                      www.triplezero.fr
                    </td>
                    <td width="240" align="center" valign="bottom">
                      triplezero@triplezero.fr
                    </td>
                    <td width="220" align="right" valign="bottom">
                      Téléphone : 05.63.72.46.63
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td height="30">&nbsp;</td>
          </tr> */}
          <tr>
            <td height="840" align="left" valign="top">
              {/* <table width="680" border={0} cellSpacing={0} cellPadding={0}>
                <tbody>
                  <tr>
                    <td align="left" valign="middle">
                      Bonjour,
                      <br />
                      Merci pour votre commande qui sera livrée par La Poste, en Colissimo suivi à
                      la date et adresse indiquées
                      <br />
                      sur la présente confirmation de commande, ou en cas d'absence, un avis de
                      passage sera déposé.
                      <br />
                      Votre règlement par carte bancaire en ligne a bien été enregistré et la
                      commande est mise en route.
                      <br />
                      Le délai indiqué correspond au départ de chez nous, délai de la poste: 48H.
                    </td>
                  </tr>
                  <tr>
                    <td height="20">&nbsp;</td>
                  </tr>
                </tbody>
              </table> */}
              <table
                width="680"
                border={0}
                cellSpacing={0}
                cellPadding={0}
                className="border border-[#014181]"
              >
                <tbody>
                  <tr>
                    <td height="5" colSpan={3}>
                      &nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td width="227" height="18" align="left">
                      &nbsp;&nbsp;Date : {format(formData.date, "dd/MM/yyyy")}
                    </td>
                    <td width="254" height="18" align="left" className="font-semibold">
                      &nbsp;&nbsp;COMMANDE n° {formData.uid.toUpperCase()}
                    </td>
                    <td width="197" align="left">
                      A LIVRER LE {format(formData.delay, "dd/MM/yyyy")}
                    </td>
                  </tr>
                  <tr>
                    <td height="5" colSpan={3}>
                      &nbsp;
                    </td>
                  </tr>
                </tbody>
              </table>
              <table width="680" border={0} cellSpacing={0} cellPadding={0}>
                <tbody>
                  <tr>
                    <td height="10" width="680">
                      &nbsp;
                    </td>
                  </tr>
                </tbody>
              </table>
              <table width="680" border={0} cellSpacing={0} cellPadding={0}>
                <tbody>
                  <tr>
                    <td width="330" height="20" align="right" valign="top">
                      <table width="330" border={0} cellSpacing={0} cellPadding={0}>
                        <tbody>
                          <tr>
                            <td colSpan={2} height="30" align="center" valign="middle">
                              Facturation
                            </td>
                          </tr>
                          <tr>
                            <td width="8" align="left" valign="top">
                              &nbsp;
                            </td>
                            <td width="322" height="18" align="left" valign="top">
                              <b>
                                {deliveryData.lastName} {deliveryData.firstName}
                              </b>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" valign="top">
                              &nbsp;
                            </td>
                            <td height="18" align="left" valign="top">
                              {deliveryData.address}
                              <br />
                              {deliveryData.address2}
                            </td>
                          </tr>
                          <tr>
                            <td align="left" valign="top">
                              &nbsp;
                            </td>
                            <td height="18" align="left" valign="top">
                              {deliveryData.zip} {deliveryData.city} {country}
                            </td>
                          </tr>
                          <tr>
                            <td align="left" valign="top">
                              &nbsp;
                            </td>
                            <td height="18" align="left" valign="top">
                              Téléphone : {deliveryData.phone}
                            </td>
                          </tr>
                          <tr>
                            <td align="left" valign="top">
                              &nbsp;
                            </td>
                            <td height="18" align="left" valign="top">
                              Email : {deliveryData.email}
                            </td>
                          </tr>
                          <tr>
                            <td height="4" colSpan={2}>
                              &nbsp;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td width="20">&nbsp;</td>
                    <td width="330" align="right" valign="top">
                      <table width="330" border={0} cellSpacing={0} cellPadding={0}>
                        <tbody>
                          <tr>
                            <td colSpan={2} height="30" align="center" valign="middle">
                              Livraison
                            </td>
                          </tr>
                          <tr>
                            <td width="8" align="left" valign="top">
                              &nbsp;
                            </td>
                            <td width="322" height="18" align="left" valign="top">
                              <b>
                                {deliveryData.d_lastName || deliveryData.lastName}{" "}
                                {deliveryData.d_firstName || deliveryData.firstName}
                              </b>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" valign="top">
                              &nbsp;
                            </td>
                            <td height="18" align="left" valign="top"></td>
                          </tr>
                          <tr>
                            <td align="left" valign="top">
                              &nbsp;
                            </td>
                            <td height="18" align="left" valign="top">
                              {deliveryData.d_address || deliveryData.address}
                              <br />
                              {deliveryData.d_address2 || deliveryData.address2}
                            </td>
                          </tr>
                          <tr>
                            <td align="left" valign="top">
                              &nbsp;
                            </td>
                            <td height="18" align="left" valign="top">
                              {deliveryData.d_zip || deliveryData.zip}{" "}
                              {deliveryData.d_city || deliveryData.city} {d_country}
                            </td>
                          </tr>
                          <tr>
                            <td height="4" colSpan={2}>
                              &nbsp;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table width="680" border={0} cellSpacing={0} cellPadding={0}>
                <tbody>
                  <tr>
                    <td height="10" width="680">
                      &nbsp;
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                width="680"
                border={1}
                cellPadding={3}
                cellSpacing={0}
                style={{ borderCollapse: "collapse", borderColor: "#014181" }}
              >
                <tbody>
                  <tr>
                    <td align="center" valign="middle">
                      Référence
                    </td>
                    <td height="30" align="center" valign="middle">
                      Options
                    </td>
                    <td align="center" valign="middle">
                      Quantité
                    </td>
                    <td align="center" valign="middle">
                      Prix Uni. {formData.detail.ttc ? "TTC" : "HT"}
                    </td>
                    <td align="center" valign="middle">
                      Montant {formData.detail.ttc ? "TTC" : "HT"}
                    </td>
                  </tr>
                  {lines.map((line, index) => {
                    return (
                      <tr key={`${line.title}-${index}`}>
                        <td width="130" align="left" valign="top">
                          {line.title}
                        </td>
                        <td width="310" align="left" valign="top">
                          <div className="flex items-center gap-2">
                            <div>Couleur :</div>
                            {line.colors.map(([name]) => (
                              <strong key={name}>{name}</strong>
                            ))}
                          </div>
                          {line.options.map(([title, value]) => (
                            <div key={title}>
                              {title} : <strong>{value}</strong>
                            </div>
                          ))}
                        </td>
                        <td width="70" align="center" valign="top">
                          {line.quantity}
                        </td>
                        <td width="80" align="right" valign="top">
                          {formatAmount(line.unitPrice)}
                        </td>
                        <td width="90" align="right" valign="top">
                          {formatAmount(line.unitPrice * line.quantity)}
                        </td>
                      </tr>
                    )
                  })}
                  <tr>
                    <td colSpan={4} align="right" valign="bottom">
                      Total
                    </td>
                    <td align="right" valign="bottom">
                      {formatAmount(formData.detail.total)}
                    </td>
                  </tr>
                  {formData.detail.discount && (
                    <>
                      <tr>
                        <td width="130" align="left" valign="top">
                          Réduction
                        </td>
                        <td colSpan={3} align="left" valign="top"></td>
                        <td width="90" align="right" valign="top">
                          {formData.detail.discount}%
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={4} align="right" valign="bottom">
                          Total
                        </td>
                        <td align="right" valign="bottom">
                          {formatAmount(formData.detail.totalWithDiscount)}
                        </td>
                      </tr>
                    </>
                  )}

                  <tr>
                    <td width="130" align="left" valign="top">
                      Frais de port
                    </td>
                    <td colSpan={3} align="left" valign="top"></td>
                    <td width="90" align="right" valign="top">
                      {formatAmount(formData.shippingFee)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5} align="right">
                      TOTAL COMMANDE {formData.detail.ttc ? "TTC" : "HT"}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <strong>{formatAmount(formData.amount)}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <table
                width="680"
                border={1}
                cellPadding={3}
                cellSpacing={0}
                style={{ borderCollapse: "collapse", borderColor: "#014181" }}
              >
                <tbody>
                  <tr>
                    <td height="22" align="center" valign="middle">
                      Commentaire ou question
                    </td>
                  </tr>
                  <tr>
                    <td height="30" align="left" valign="top">
                      {formData.comment || "Pas de commentaire"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top" height="2">
              <table width="530" border={0} cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td width="530" height="2">
                      &nbsp;
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td height="20" align="center" valign="top">
              TRIPLE ZERO - 1 Chemin de la Fontaine - F-81540 DURFORT
              <br />
              <span>
                S.A.R.L. Capital 7 622 € - R.M. Toulouse 690 800 727 - RC Toulouse 69 B 72 - SIRET
                690 800 727 00016 - APE 174 B
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* <div>
        <div className="flex justify-between">
          <div>Date: {format(formData.date, "dd/MM/yyyy")}</div>
          <div>COMMANDE {formData.uid.toUpperCase()}</div>
          <div>A livrer le {format(formData.delay, "dd/MM/yyyy")}</div>
        </div>
      </div> */}
      {/* <div>
        {value.map((line) => {
          return (
            <div key={line.title} className="max-xs:flex-col flex items-start max-xl:flex-wrap">
              <div className="xs:w-40 w-full p-4 sm:w-60 xl:w-1/4 xl:px-6">
                {line.image && (
                  <div className="relative flex-shrink-0">
                    <Image
                      src={line.image}
                      width={320}
                      height={320}
                      className="h-auto w-full rounded-xl"
                      alt={line.title}
                    />
                    {line.discount && (
                      <PromotionDiscount size="sm">{line.discount}%</PromotionDiscount>
                    )}
                  </div>
                )}
              </div>
              <div className="w-full flex-1 xl:flex">
                <div className="p-4 xl:w-1/2 xl:px-6">
                  {line.title}

                  <div className="flex items-center gap-2">
                    <div>Couleur :</div>
                    {line.colors.map(([_, color]) => (
                      <div
                        key={color}
                        style={{ backgroundColor: color }}
                        className="h-4 w-4 rounded-full"
                      />
                    ))}
                  </div>
                  {line.options.map(([title, value]) => (
                    <div key={title}>
                      {title} : <strong>{value}</strong>
                    </div>
                  ))}
                </div>
                <div className="p-4 xl:w-1/4 xl:px-6">
                  <div className="flex items-center gap-1">
                    <div className="bg-blue-light border-{l}e-grey {y}1 w-10 flex-shrink-0 cursor-default rounded-lg border text-center select-none">
                      {line.quantity}
                    </div>
                  </div>
                </div>
                <div className="space-x-2 p-4 text-xl select-none xl:w-1/4 xl:px-6">
                  {line.discount ? (
                    <>
                      <Amount
                        amount={line.price * line.quantity}
                        className="text-sm font-normal line-through"
                      />
                      <Amount amount={line.price * line.quantity * (1 - line.discount / 100)} />
                    </>
                  ) : (
                    <Amount amount={line.price * line.quantity} />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div> */}
    </div>
  )
}
