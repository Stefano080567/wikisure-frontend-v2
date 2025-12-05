import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function saveToNotion({ term, code, tags = [] }) {
  if (!notion || !databaseId) throw new Error('Missing Notion setup');
  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Name: { title: [{ text: { content: term } }] },
      Tags: { multi_select: tags.map(tag => ({ name: tag })) }
    },
    children: [{
      object: 'block',
      type: 'code',
      code: {
        language: 'typescript',
        rich_text: [{ text: { content: code } }]
      }
    }]
  });
  return response;
}
