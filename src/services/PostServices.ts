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