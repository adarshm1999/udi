import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');
const filePath = path.join(dataDirectory, 'questions.json');

function ensureFileExists() {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      JSON.stringify(
        {
          answers: [],
        },
        null,
        2
      )
    );
  }
}

function readData() {
  ensureFileExists();

  const file = fs.readFileSync(filePath, 'utf8');

  try {
    return JSON.parse(file);
  } catch (error) {
    return {
      answers: [],
    };
  }
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/**
 * GET
 * Returns all saved answers
 */
export async function GET() {
  try {
    const data = readData();

    return NextResponse.json({
      success: true,
      data: data.answers,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to load answers.',
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * POST
 * Save / Update Answer
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      id,
      question,
      answer,
    } = body;

    if (!id || !question || !answer) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields.',
        },
        {
          status: 400,
        }
      );
    }

    const data = readData();

    const existingIndex = data.answers.findIndex(
      (item: any) => item.id === id
    );

    if (existingIndex !== -1) {
      data.answers[existingIndex] = {
        ...data.answers[existingIndex],
        answer,
        updatedAt: new Date().toISOString(),
      };
    } else {
      data.answers.push({
        id,
        question,
        answer,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    writeData(data);

    return NextResponse.json({
      success: true,
      message: 'Answer saved successfully.',
      data: data.answers,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong.',
      },
      {
        status: 500,
      }
    );
  }
}