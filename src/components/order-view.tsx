import COUNTRIES_FR from "@/data/countries-fr"
import { formatAmount } from "@/lib/text"
import { Order } from "@/payload-types"
import { formSchema } from "@/providers/checkout/checkout"
import { OrderCartLine } from "@/types/global"
import { format } from "date-fns"
import { z } from "zod"

const translations: Record<NonNullable<Order["payment"]>, string> = {
  check: "Chèque",
  transfer: "Virement bancaire",
  card: "Carte de crédit",
}

interface Props {
  lines: OrderCartLine[]
  comment?: string
  deliveryData: z.infer<typeof formSchema>
  shippingFee: number
  amount: number
  delay?: string
  uid: string
  date: string
  detail: {
    total: number
    totalWithDiscount: number
    discount?: number
    ttc: boolean
  }
  payment?: Order["payment"]
}

export const OrderView = ({
  deliveryData,
  lines,
  detail,
  comment,
  shippingFee,
  amount,
  delay,
  uid,
  date,
  payment,
}: Props) => {
  const country = Object.values(COUNTRIES_FR).find((c) => c[deliveryData.country])?.[
    deliveryData.country
  ]
  const d_country = deliveryData.d_country
    ? Object.values(COUNTRIES_FR).find((c) => c[String(deliveryData.d_country)])?.[
        deliveryData.d_country
      ]
    : country

  return (
    <table
      width="600"
      border={0}
      cellPadding={0}
      cellSpacing={0}
      align="center"
      id="order-detail"
      style={{ fontSize: "14px" }}
    >
      <tbody>
        <tr>
          <td height="840" align="left" valign="top">
            <table
              width="600"
              border={0}
              cellSpacing={0}
              cellPadding={0}
              className="border border-[#014181]"
              style={{ fontSize: "14px" }}
            >
              <tbody>
                <tr>
                  <td height="5" colSpan={3}>
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td width="227" height="18" align="left">
                    &nbsp;&nbsp;DATE : <strong>{format(date, "dd/MM/yyyy")}</strong>
                    {delay && (
                      <>
                        <br />
                        &nbsp;&nbsp;A LIVRER LE : <strong>{format(delay, "dd/MM/yyyy")}</strong>
                      </>
                    )}
                    {payment && (
                      <>
                        <br />
                        &nbsp;&nbsp;PAIEMENT : <strong>{translations[payment]}</strong>
                      </>
                    )}
                  </td>
                  <td width="300" height="18" align="left" className="font-semibold" colSpan={2}>
                    &nbsp;&nbsp;COMMANDE n° <strong>{uid.toUpperCase()}</strong>
                  </td>
                </tr>
                <tr>
                  <td height="5" colSpan={3}>
                    &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              width="600"
              border={0}
              cellSpacing={0}
              cellPadding={0}
              style={{ fontSize: "14px" }}
            >
              <tbody>
                <tr>
                  <td height="10" width="600">
                    &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              width="600"
              border={0}
              cellSpacing={0}
              cellPadding={0}
              style={{ fontSize: "14px" }}
            >
              <tbody>
                <tr>
                  <td width="330" height="20" align="right" valign="top">
                    <table
                      width="330"
                      border={0}
                      cellSpacing={0}
                      cellPadding={0}
                      style={{ fontSize: "14px" }}
                    >
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
                    <table
                      width="330"
                      border={0}
                      cellSpacing={0}
                      cellPadding={0}
                      style={{ fontSize: "14px" }}
                    >
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
            <table
              width="600"
              border={0}
              cellSpacing={0}
              cellPadding={0}
              style={{ fontSize: "14px" }}
            >
              <tbody>
                <tr>
                  <td height="10" width="600">
                    &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              width="600"
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
                    Prix Uni. {detail.ttc ? "TTC" : "HT"}
                  </td>
                  <td align="center" valign="middle">
                    Montant {detail.ttc ? "TTC" : "HT"}
                  </td>
                </tr>
                {lines.map((line, index) => {
                  return (
                    <tr key={`${line.title}-${index}`}>
                      <td width="130" align="left" valign="top">
                        {line.title}
                      </td>
                      <td width="310" align="left" valign="top">
                        <span>Couleur :&nbsp;</span>
                        {line.colors.map(([name]) => (
                          <strong key={name}>{name}</strong>
                        ))}
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
                    {formatAmount(detail.total)}
                  </td>
                </tr>
                {detail.discount && (
                  <>
                    <tr>
                      <td width="130" align="left" valign="top">
                        Réduction
                      </td>
                      <td colSpan={3} align="left" valign="top"></td>
                      <td width="90" align="right" valign="top">
                        {detail.discount}%
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4} align="right" valign="bottom">
                        Total
                      </td>
                      <td align="right" valign="bottom">
                        {formatAmount(detail.totalWithDiscount)}
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
                    {formatAmount(shippingFee)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} align="right">
                    TOTAL COMMANDE {detail.ttc ? "TTC" : "HT"}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <strong>{formatAmount(amount)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <table
              width="600"
              border={1}
              cellPadding={3}
              cellSpacing={0}
              style={{ borderCollapse: "collapse", borderColor: "#014181", fontSize: "14px" }}
            >
              <tbody>
                <tr>
                  <td height="22" align="center" valign="middle">
                    Commentaire ou question
                  </td>
                </tr>
                <tr>
                  <td height="30" align="left" valign="top">
                    {comment || "Pas de commentaire"}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" valign="top" height="2">
            <table
              width="530"
              border={0}
              cellPadding={0}
              cellSpacing={0}
              style={{ fontSize: "14px" }}
            >
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
              S.A.R.L. Capital 7 622 € - R.M. Toulouse 690 800 727 - RC Toulouse 69 B 72 - SIRET 690
              800 727 00016 - APE 174 B
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
