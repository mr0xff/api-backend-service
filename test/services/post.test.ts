import { test, describe, beforeEach } from 'node:test'
import * as assert from 'node:assert'
import { PostService } from "../../src/services"

describe("PostService Unit Tests", () => {
  let postService: PostService;
  let mockDb: any;

  // Setup: Antes de cada teste, limpamos o mock e reiniciamos o serviço
  beforeEach(() => {
    mockDb = {
      post: {
        // Simulando o comportamento do banco de dados (Prisma/Knex style)
        create: async ({ data }: any) => ({ id: '1', ...data }),
        findMany: async () => [{ id: '1', title: 'Post Teste' }],
        findUnique: async ({ where }: any) => {
          if (where.id === '1') return { id: '1', title: 'Post Teste' };
          return null;
        }
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

    assert.strictEqual(result.title, validData.title);
    assert.strictEqual(result.id, '1');
  });

  test("should throw an error if title is too short", async () => {
    const invalidData = {
      title: "Oi",
      content: "...",
      authorId: "1"
    };

    // No node:test, verificamos erros com rejects
    await assert.rejects(
      async () => await postService.create(invalidData),
      { message: 'O título está muito curto.' }
    );
  });

  test("should find a post by id", async () => {
    const post = await postService.findById('1');
    assert.ok(post);
    assert.strictEqual(post.id, '1');
  });

  test("should throw error when post is not found", async () => {
    await assert.rejects(
      async () => await postService.findById('999'),
      { message: 'Post não encontrado' }
    );
  });
});