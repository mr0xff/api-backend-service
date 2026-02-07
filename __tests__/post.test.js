import { PostService } from "../src/services";

describe("PostService Unit Tests", () => {
  let postService;
  let mockDb;

  // Setup: No Jest, usamos o global beforeEach
  beforeEach(() => {
    mockDb = {
      post: {
        create: jest.fn(async ({ data }) => ({ id: '1', ...data })),
        findMany: jest.fn(async () => [{ id: '1', title: 'Post Teste' }]),
        findUnique: jest.fn(async ({ where }) => {
          if (where.id === '1') return { id: '1', title: 'Post Teste' };
          return null;
        })
      }
    };
    postService = new PostService(mockDb);
  });

  test("should create a post successfully when data is valid", async () => {
    const validData = {
      title: "Título Válido",
      content: "Conteúdo longo o suficiente",
      authorId: "user-1"
    };

    const result = await postService.create(validData);

    // No Jest usamos expect().toBe() ou expect().toEqual()
    expect(result.title).toBe(validData.title);
    expect(result.id).toBe('1');
    expect(mockDb.post.create).toHaveBeenCalledTimes(1);
  });

  test("should throw an error if title is too short", async () => {
    const invalidData = {
      title: "Oi",
      content: "...",
      authorId: "1"
    };

    // No Jest usamos rejects.toThrow()
    await expect(postService.create(invalidData))
      .rejects
      .toThrow('O título está muito curto.');
  });

  test("should find a post by id", async () => {
    const post = await postService.findById('1');
    
    expect(post).toBeDefined();
    expect(post.id).toBe('1');
  });

  test("should throw error when post is not found", async () => {
    // Verificando se a promise rejeita com a mensagem exata
    await expect(postService.findById('999'))
      .rejects
      .toThrow('Post não encontrado');
  });
});