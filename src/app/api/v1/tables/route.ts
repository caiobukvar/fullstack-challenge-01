import { NextRequest, NextResponse } from "next/server";
import database from "../../../../../infra/database";

export async function GET(req: NextRequest, res: NextResponse) {
  const createUserTable = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  );
`;

  try {
    await database.query(createUserTable);

    console.log("Tabela criada com sucesso");

    return NextResponse.json(
      { response: "tabela criada" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Tabela criada com sucesso");

    return NextResponse.json(
      { response: "Erro ao criar tabela" },
      {
        status: 400,
      }
    );
  }
}
