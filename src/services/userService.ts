import { User } from "../models/userModel";
import { query } from "../utils/database"

export class UserService {
  static async getUserById(user_id: string): Promise<{ user: User | null, error: string | null }> {
    try {
      const result = await query('SELECT * FROM users WHERE id = $1', [user_id]);
      if (result && result.rows && result.rows.length > 0) {
        const user = result.rows[0];
        return { user, error: null };
      }

      return { user: null, error: null };
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      return { user: null, error: 'Erro interno do servidor' };
    }
  }

  static async getUserByEmail(email: string): Promise<{ user: User | null, error: string | null }> {
    try {
      const result = await query('SELECT * FROM users WHERE email = $1', [email]);
      if (result && result.rows && result.rows.length > 0) {
        const user = result.rows[0];
        return { user, error: null };
      }

      return { user: null, error: null };     
    } catch (error) {
      console.error('Erro ao buscar usuário por Email:', error);
      return { user: null, error: "Erro interno do servidor" };
    }
  }

  static async createUser(data: any): Promise<{ createdUserID: string | null; error: string | null }> {
    try {
      const { name, email, pwd } = data;

      const result = await query('INSERT INTO users (name, email, pwd) VALUES ($1, $2, $3) RETURNING id', [name, email, pwd]);
      if (result && result.rows && result.rows.length > 0 && result.rows[0].id) {
        return { createdUserID: result.rows[0].id, error: null };
      }

      return { createdUserID: null, error: null };
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return { createdUserID: '', error: 'Erro interno do servidor' };
    }
  }

  // Função para atualizar um usuário
  static async updateUser(user_id: string, updatedUser: any): Promise<{ updatedUser: any | null; error: string | null }> {
    return { updatedUser: null, error: null };
  }

  // Função para remover um usuário
  static async deleteUser(user_id: string): Promise<{ deletedUser: any | null; error: string | null }> {
    return { deletedUser: null, error: null };
  }
}
