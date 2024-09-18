export interface Tag {
  name: string;
  id: string;
  blogs?: Blog[];
  slug: string;
}

export interface BlogInput {
  title: string;
  content: string;
  tags?: Tag[];
  excerpt?: string;
  heroImage?: string;
}

export interface Blog extends BlogInput {
  id: string;
  slug?: string;
  published: string;
}
