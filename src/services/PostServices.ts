// import axios, { AxiosInstance } from 'axios';

// // Interface para definir a estrutura do dado (evita duplicidade de tipos)
// export interface Post {
//   id: number;
//   title: string;
//   body: string;
//   userId: number;
// }

// export default class PostService {
//   private api: AxiosInstance;

//   constructor() {
//     this.api = axios.create({
//       baseURL: 'https://jsonplaceholder.typicode.com',
//       timeout: 5000,
//     });
//   }

//   /**
//    * Busca todos os posts
//    */
//   async getAllPosts(): Promise<Post[]> {
//     try {
//       const response = await this.api.get<Post[]>('/posts');
//       return response.data;
//     } catch (error) {
//       console.error("Erro ao buscar posts:", error);
//       throw new Error("Não foi possível carregar os posts.");
//     }
//   }

//   /**
//    * Busca um post específico pelo ID
//    */
//   async getPostById(id: number): Promise<Post> {
//     try {
//       const response = await this.api.get<Post>(`/posts/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Erro ao buscar post ${id}:`, error);
//       throw new Error("Post não encontrado.");
//     }
//   }

//   /**
//    * Cria um novo post
//    */
//   async createPost(data: Omit<Post, 'id'>): Promise<Post> {
//     try {
//       const response = await this.api.post<Post>('/posts', data);
//       return response.data;
//     } catch (error) {
//       console.error("Erro ao criar post:", error);
//       throw new Error("Falha ao salvar o post.");
//     }
//   }

//   /**
//    * Deleta um post
//    */
//   async deletePost(id: number): Promise<void> {
//     try {
//       await this.api.delete(`/posts/${id}`);
//     } catch (error) {
//       console.error("Erro ao deletar post:", error);
//       throw new Error("Não foi possível excluir o post.");
//     }
//   }
// }

// src/services/PostService.ts

export interface PostInput {
  title: string;
  content: string;
  authorId: string;
}

export default class PostService {
  // Aqui você receberia sua instância do DB (ex: Prisma)
  constructor(private db: any) {}

  async create(data: PostInput) {
    // Lógica de validação ou negócio antes de salvar
    if (data.title.length < 5) {
      throw new Error("O título está muito curto.");
    }

    return await this.db.post.create({ data });
  }

  async listAll() {
    return await this.db.post.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id: string) {
    const post = await this.db.post.findUnique({ where: { id } });
    if (!post) throw new Error("Post não encontrado");
    return post;
  }
}