import { Transaction } from "../models/transactionModel";
import { query } from "../utils/database";

export class TransactionService {
    static async getTransactionByDonation(donation_id: string, status: string): Promise<{ transactions: Transaction[] | null, error: string | null }> {
        try {
            const result = await query('SELECT * FROM transactions WHERE donation_id = $1 AND status = $2', [donation_id, status]);

            const transactions = result.rows;
            return { transactions, error: null };
        } catch (error) {
            console.error('Erro ao buscar transações por donation_id:', error);
            return { transactions: null, error: 'Erro interno do servidor' };
        }
    }
    
    static async getTransactionById(transaction_id: string): Promise<{ transaction: Transaction | null, error: string | null }> {
        try {
            const result = await query('SELECT * FROM transactions WHERE id = $1', [transaction_id]);
            if (result && result.rows && result.rows.length > 0) {
                const transaction = result.rows[0];
                return { transaction, error: null };
            }

            return { transaction: null, error: null };
        } catch (error) {
            console.error('Erro ao buscar transação por ID:', error);
            return { transaction: null, error: 'Erro interno do servidor' };
        }
    }

    static async createTransaction(data: any): Promise<{ createdTransactionID: string | null; error: string | null }> {
        try {
            const { txid, location, qr_code, pix_copy_paste, amount, alias, email, message, status, donation_id } = data;

            const result = await query(
                'INSERT INTO transactions (txid, location, qr_code, pix_copy_paste, amount, alias, email, message, status, donation_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id', 
                [txid, location, qr_code, pix_copy_paste, amount, alias, email, message, status, donation_id]
            );
            
            if (result && result.rows && result.rows.length > 0 && result.rows[0].id) {
                return { createdTransactionID: result.rows[0].id, error: null };
            }

            return { createdTransactionID: null, error: null };
        } catch (error) {
            console.error('Erro ao criar transação:', error);
            return { createdTransactionID: '', error: 'Erro interno do servidor' };
        }
    }
}