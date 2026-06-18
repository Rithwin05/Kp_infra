import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME || 'kp_infra'

let cachedClient = null
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri)
    await cachedClient.connect()
  }
  return cachedClient.db(dbName)
}

const json = (data, status = 200) =>
  NextResponse.json(data, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })

export async function OPTIONS() { return json({ ok: true }) }

function route(parts) { return '/' + (parts || []).join('/') }

export async function GET(request, { params }) {
  const { path = [] } = await params
  const p = route(path)
  try {
    if (p === '/' || p === '/health') {
      return json({ status: 'ok', service: 'KP Infra API', time: new Date().toISOString() })
    }
    if (p === '/leads') {
      const db = await getDb()
      const leads = await db.collection('leads').find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(100).toArray()
      return json({ leads })
    }
    if (p === '/visits') {
      const db = await getDb()
      const visits = await db.collection('visits').find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(100).toArray()
      return json({ visits })
    }
    return json({ error: 'Not found', path: p }, 404)
  } catch (e) {
    return json({ error: e.message }, 500)
  }
}

export async function POST(request, { params }) {
  const { path = [] } = await params
  const p = route(path)
  try {
    const body = await request.json().catch(() => ({}))
    const db = await getDb()

    if (p === '/leads' || p === '/lead') {
      const lead = {
        id: uuidv4(),
        name: body.name || '',
        phone: body.phone || '',
        email: body.email || '',
        interest: body.interest || 'General Enquiry',
        project: body.project || '',
        message: body.message || '',
        source: body.source || 'website',
        createdAt: new Date().toISOString(),
      }
      await db.collection('leads').insertOne(lead)
      return json({ success: true, lead })
    }

    if (p === '/visits' || p === '/visit') {
      const visit = {
        id: uuidv4(),
        name: body.name || '',
        phone: body.phone || '',
        email: body.email || '',
        project: body.project || '',
        date: body.date || '',
        time: body.time || '',
        notes: body.notes || '',
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
      await db.collection('visits').insertOne(visit)
      return json({ success: true, visit })
    }

    if (p === '/brochure') {
      const req = {
        id: uuidv4(),
        name: body.name || '',
        phone: body.phone || '',
        email: body.email || '',
        project: body.project || '',
        createdAt: new Date().toISOString(),
      }
      await db.collection('brochure_requests').insertOne(req)
      return json({ success: true, request: req })
    }

    if (p === '/calculator') {
      const record = {
        id: uuidv4(),
        investment: Number(body.investment) || 0,
        appreciation: Number(body.appreciation) || 0,
        years: Number(body.years) || 0,
        createdAt: new Date().toISOString(),
      }
      await db.collection('calculator_runs').insertOne(record)
      return json({ success: true, record })
    }

    return json({ error: 'Not found', path: p }, 404)
  } catch (e) {
    return json({ error: e.message }, 500)
  }
}
