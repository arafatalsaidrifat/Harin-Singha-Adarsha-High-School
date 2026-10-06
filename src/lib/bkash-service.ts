export interface BkashTokenResponse {
  id_token: string;
  token_type: string;
  expires_in: number;
  cachedAt: number;
}

export interface BkashPaymentCreateResponse {
  paymentID: string;
  bkashURL: string;
  amount: number;
  currency: string;
  merchantInvoiceNumber: string;
  transactionStatus: 'Initiated' | 'Authorized' | 'Executed' | 'Failed';
  createTime: string;
}

export interface BkashPaymentExecuteResponse {
  paymentID: string;
  trxID: string;
  amount: number;
  currency: string;
  customerMsisdn: string;
  merchantInvoiceNumber: string;
  transactionStatus: 'Completed' | 'Successful';
  paymentExecuteTime: string;
  statusCode: '0000';
  statusMessage: 'Successful';
}

class BkashCheckoutService {
  private cachedToken: BkashTokenResponse | null = null;
  private tokenTtlMs = 3500 * 1000; // 3500 seconds TTL

  /**
   * Simulates POST /api/payments/bkash/token
   * Grant token request with in-memory caching
   */
  async grantToken(): Promise<BkashTokenResponse> {
    const now = Date.now();
    if (this.cachedToken && now - this.cachedToken.cachedAt < this.tokenTtlMs) {
      return this.cachedToken;
    }

    // Simulate round-trip to bKash auth servers
    await new Promise((r) => setTimeout(r, 200));

    const token: BkashTokenResponse = {
      id_token: 'bkash_tok_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now(),
      token_type: 'Bearer',
      expires_in: 3600,
      cachedAt: now,
    };

    this.cachedToken = token;
    return token;
  }

  /**
   * Simulates POST /api/payments/bkash/create
   */
  async createPayment(params: {
    amount: number;
    merchantInvoiceNumber: string;
    studentName: string;
  }): Promise<BkashPaymentCreateResponse> {
    await this.grantToken();
    await new Promise((r) => setTimeout(r, 250));

    const paymentID = 'TRX_BK_' + Math.random().toString(36).substring(2, 9).toUpperCase() + '_' + Date.now().toString().slice(-6);

    return {
      paymentID,
      bkashURL: `https://checkout.bkash.com/payment/process?paymentID=${paymentID}`,
      amount: params.amount,
      currency: 'BDT',
      merchantInvoiceNumber: params.merchantInvoiceNumber,
      transactionStatus: 'Initiated',
      createTime: new Date().toISOString(),
    };
  }

  /**
   * Simulates POST /api/payments/bkash/execute
   */
  async executePayment(paymentID: string, walletPhone: string, merchantInvoiceNumber: string, amount: number): Promise<BkashPaymentExecuteResponse> {
    await new Promise((r) => setTimeout(r, 350));

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const trxID = 'BK' + Date.now().toString().slice(-4) + randomSuffix;

    return {
      paymentID,
      trxID,
      amount,
      currency: 'BDT',
      customerMsisdn: walletPhone,
      merchantInvoiceNumber,
      transactionStatus: 'Completed',
      paymentExecuteTime: new Date().toISOString(),
      statusCode: '0000',
      statusMessage: 'Successful',
    };
  }
}

export const bkashService = new BkashCheckoutService();
