import { Donation } from "../models/donationModel";
import { query } from "../utils/database";

export class DonationService {
    static async getDonations(): Promise<{ donations: Donation[] | null, error: string | null }>{
      try{
        const result = await query('SELECT * FROM donations');

        const donations = result.rows;
        return {donations, error: null}
      }catch(error){
        console.error('Erro ao resgatar doações: ', error);
        return {donations: null, error: 'Erro interno do servidor'};
      }
      return { donations: null, error: 'Erro interno do servidor' };
    }

    static async getDonationById(donation_id: string): Promise<{ donation: Donation | null, error: string | null }>{
        try {
            const result = await query('SELECT * FROM donations WHERE id = $1', [donation_id]);
            if (result && result.rows && result.rows.length > 0) {
              const donation = result.rows[0];
              return { donation, error: null };
            }
            return { donation: null, error: null };
          } catch (error) {
            console.error('Erro ao buscar donation por ID:', error);
            return { donation: null, error: 'Erro interno do servidor' };
          }
    }

    static async createDonation(data: any, user_id: string): Promise<{ createdDonationID: string | null; error: string | null }> {
        try {
            const { name, description, goal, url_image, deadline, state, category } = data;
      
            const result = await query('INSERT INTO donations (name, description, goal, url_image, deadline, state, category, user_id, amount_raised) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id', [name, description, goal, url_image, deadline, state, category, user_id, "0"]);
            if (result && result.rows && result.rows.length > 0 && result.rows[0].id) {
              return { createdDonationID: result.rows[0].id, error: null };
            }
      
            return { createdDonationID: null, error: null };
          } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return { createdDonationID: '', error: 'Erro interno do servidor' };
          }
    }

    static async updateDonation(donation_id: string, updatedDonationData: any): Promise<{ updatedDonation: any | null; error: string | null }> {
      try {
        const { newName, newGoal, newUrlImage, newDeadline, newState, newCategory, newDescription } = updatedDonationData;
    
        const result = await query('UPDATE donations SET name = $1, goal = $2, url_image = $3, deadline = $4, state = $5, category = $6, description = $7 WHERE id = $8 RETURNING *', [newName, newGoal, newUrlImage,newDeadline, newState, newCategory, newDescription, donation_id]);
    
        if (result && result.rows && result.rows.length > 0) {
          const updatedDonation = result.rows[0];
          return { updatedDonation, error: null };
        }
    
        return { updatedDonation: null, error: null };
      } catch (error) {
        console.error('Erro ao atualizar doação:', error);
        return { updatedDonation: null, error: 'Erro interno do servidor' };
      }
    }

    static async deleteDonation(donation_id: string): Promise<{ deletedDonation: any | null; error: string | null }> {
      try {
        const result = await query('DELETE FROM donations WHERE id = $1', [donation_id]);
  
        if (result && result.rows && result.rows.length > 0) {
          const deletedDonation = result.rows[0];
          return { deletedDonation, error: null };
        }
        return { deletedDonation: null, error: null }; 
      }catch (error) {
        console.error('Erro ao deletar doação:', error);
        return { deletedDonation: null, error: 'Erro interno do servidor'};
      }
    }
}