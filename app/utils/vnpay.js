import crypto from "crypto";

export const createVnpayPaymentUrl = ({
  amount,
  orderInfo = "Thanh toan don hang cong nghe",
  orderType = "other",
  returnUrl = "http://localhost:3000/complete",
}) => {
  const vnp_TmnCode = "43SPEE0X";
  const vnp_HashSecret = "BIM3PN7O9Y2V5ECNOMHKXBY40V17I3K0";
  const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

  const txnRef = Date.now().toString();
  const createDate = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", "")
    .replace(/[-:]/g, "");

  const params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: vnp_TmnCode,
    vnp_Amount: amount * 100,
    vnp_CurrCode: "VND",
    vnp_TxnRef: txnRef,
    vnp_CreateDate: createDate,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: orderType,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: "127.0.0.1",
    vnp_ExpireDate: "20250610101010",
    vnp_Locale: "vn",
  };

  const sortedParams = Object.keys(params)
    .sort()
    .reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {});

  const queryString = new URLSearchParams(sortedParams).toString();

  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const secureHash = hmac.update(queryString).digest("hex");
  console.log(`${vnp_Url}?${queryString}&vnp_SecureHash=${secureHash}`);
  return `${vnp_Url}?${queryString}&vnp_SecureHash=${secureHash}`;
};
