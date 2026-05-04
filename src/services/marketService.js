import marketPrices from '../data/marketPrices.json'
import { storage } from '../utils/storage'

const FAVORITES_KEY = 'favorite_crops'
const AGMARKNET_API_URL =
  import.meta.env.VITE_AGMARKNET_API_URL || 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070'
const AGMARKNET_API_KEY = import.meta.env.VITE_AGMARKNET_API_KEY || ''

// Hardcoded Agmarknet-style market data for demo
const HARDCODED_MARKET_DATA = [
  // Tamil Nadu - Barley
  { market_name: 'Madurai Market', state_name: 'Tamil Nadu', district_name: 'Madurai', cmdt_name: 'Barley', min_price: 2100, max_price: 2450, modal_price: 2280 },
  { market_name: 'Trichy Market', state_name: 'Tamil Nadu', district_name: 'Tiruchirappalli', cmdt_name: 'Barley', min_price: 2050, max_price: 2400, modal_price: 2200 },
  { market_name: 'Coimbatore Yard', state_name: 'Tamil Nadu', district_name: 'Coimbatore', cmdt_name: 'Barley', min_price: 2150, max_price: 2500, modal_price: 2320 },
  // Tamil Nadu - Rice
  { market_name: 'Madurai Market', state_name: 'Tamil Nadu', district_name: 'Madurai', cmdt_name: 'Rice', min_price: 2800, max_price: 3200, modal_price: 3000 },
  { market_name: 'Trichy Market', state_name: 'Tamil Nadu', district_name: 'Tiruchirappalli', cmdt_name: 'Rice', min_price: 2750, max_price: 3150, modal_price: 2950 },
  { market_name: 'Coimbatore Yard', state_name: 'Tamil Nadu', district_name: 'Coimbatore', cmdt_name: 'Rice', min_price: 2900, max_price: 3300, modal_price: 3100 },
  // Tamil Nadu - Groundnut
  { market_name: 'Madurai Market', state_name: 'Tamil Nadu', district_name: 'Madurai', cmdt_name: 'Groundnut', min_price: 5200, max_price: 6100, modal_price: 5650 },
  { market_name: 'Trichy Market', state_name: 'Tamil Nadu', district_name: 'Tiruchirappalli', cmdt_name: 'Groundnut', min_price: 5100, max_price: 6000, modal_price: 5550 },
  { market_name: 'Coimbatore Yard', state_name: 'Tamil Nadu', district_name: 'Coimbatore', cmdt_name: 'Groundnut', min_price: 5300, max_price: 6200, modal_price: 5750 },
  // Karnataka - Barley
  { market_name: 'Bengaluru Yard', state_name: 'Karnataka', district_name: 'Bengaluru', cmdt_name: 'Barley', min_price: 2200, max_price: 2550, modal_price: 2380 },
  { market_name: 'Mysuru Market', state_name: 'Karnataka', district_name: 'Mysuru', cmdt_name: 'Barley', min_price: 2100, max_price: 2480, modal_price: 2280 },
  { market_name: 'Hubli Yard', state_name: 'Karnataka', district_name: 'Hubli', cmdt_name: 'Barley', min_price: 2050, max_price: 2420, modal_price: 2230 },
  // Karnataka - Wheat
  { market_name: 'Bengaluru Yard', state_name: 'Karnataka', district_name: 'Bengaluru', cmdt_name: 'Wheat', min_price: 2500, max_price: 2900, modal_price: 2700 },
  { market_name: 'Mysuru Market', state_name: 'Karnataka', district_name: 'Mysuru', cmdt_name: 'Wheat', min_price: 2450, max_price: 2850, modal_price: 2650 },
  { market_name: 'Hubli Yard', state_name: 'Karnataka', district_name: 'Hubli', cmdt_name: 'Wheat', min_price: 2550, max_price: 2950, modal_price: 2750 },
  // Karnataka - Ragi
  { market_name: 'Mysuru Market', state_name: 'Karnataka', district_name: 'Mysuru', cmdt_name: 'Ragi', min_price: 3100, max_price: 3800, modal_price: 3450 },
  { market_name: 'Bengaluru Yard', state_name: 'Karnataka', district_name: 'Bengaluru', cmdt_name: 'Ragi', min_price: 3200, max_price: 3900, modal_price: 3550 },
  { market_name: 'Hubli Yard', state_name: 'Karnataka', district_name: 'Hubli', cmdt_name: 'Ragi', min_price: 3000, max_price: 3700, modal_price: 3350 },
  // Kerala - Barley
  { market_name: 'Kochi Yard', state_name: 'Kerala', district_name: 'Ernakulam', cmdt_name: 'Barley', min_price: 2300, max_price: 2700, modal_price: 2500 },
  { market_name: 'Thiruvananthapuram Market', state_name: 'Kerala', district_name: 'Thiruvananthapuram', cmdt_name: 'Barley', min_price: 2250, max_price: 2650, modal_price: 2450 },
  { market_name: 'Kozhikode Yard', state_name: 'Kerala', district_name: 'Kozhikode', cmdt_name: 'Barley', min_price: 2200, max_price: 2600, modal_price: 2400 },
  // Kerala - Rice
  { market_name: 'Kochi Yard', state_name: 'Kerala', district_name: 'Ernakulam', cmdt_name: 'Rice', min_price: 3100, max_price: 3600, modal_price: 3350 },
  { market_name: 'Thiruvananthapuram Market', state_name: 'Kerala', district_name: 'Thiruvananthapuram', cmdt_name: 'Rice', min_price: 3050, max_price: 3550, modal_price: 3300 },
  { market_name: 'Kozhikode Yard', state_name: 'Kerala', district_name: 'Kozhikode', cmdt_name: 'Rice', min_price: 3150, max_price: 3650, modal_price: 3400 },
  // Kerala - Coconut
  { market_name: 'Kochi Yard', state_name: 'Kerala', district_name: 'Ernakulam', cmdt_name: 'Coconut', min_price: 1800, max_price: 2300, modal_price: 2050 },
  { market_name: 'Thiruvananthapuram Market', state_name: 'Kerala', district_name: 'Thiruvananthapuram', cmdt_name: 'Coconut', min_price: 1750, max_price: 2250, modal_price: 2000 },
  { market_name: 'Kozhikode Yard', state_name: 'Kerala', district_name: 'Kozhikode', cmdt_name: 'Coconut', min_price: 1900, max_price: 2400, modal_price: 2150 },
  // Maharashtra - Barley
  { market_name: 'Nashik Market', state_name: 'Maharashtra', district_name: 'Nashik', cmdt_name: 'Barley', min_price: 1950, max_price: 2300, modal_price: 2120 },
  { market_name: 'Pune Yard', state_name: 'Maharashtra', district_name: 'Pune', cmdt_name: 'Barley', min_price: 2050, max_price: 2400, modal_price: 2220 },
  { market_name: 'Mumbai Market', state_name: 'Maharashtra', district_name: 'Mumbai', cmdt_name: 'Barley', min_price: 2100, max_price: 2450, modal_price: 2270 },
  // Maharashtra - Onion
  { market_name: 'Nashik Market', state_name: 'Maharashtra', district_name: 'Nashik', cmdt_name: 'Onion', min_price: 1800, max_price: 2600, modal_price: 2210 },
  { market_name: 'Pune Yard', state_name: 'Maharashtra', district_name: 'Pune', cmdt_name: 'Onion', min_price: 1900, max_price: 2700, modal_price: 2310 },
  { market_name: 'Mumbai Market', state_name: 'Maharashtra', district_name: 'Mumbai', cmdt_name: 'Onion', min_price: 2000, max_price: 2800, modal_price: 2400 },
  // Maharashtra - Sugarcane
  { market_name: 'Nashik Market', state_name: 'Maharashtra', district_name: 'Nashik', cmdt_name: 'Sugarcane', min_price: 3500, max_price: 4200, modal_price: 3850 },
  { market_name: 'Pune Yard', state_name: 'Maharashtra', district_name: 'Pune', cmdt_name: 'Sugarcane', min_price: 3600, max_price: 4300, modal_price: 3950 },
  { market_name: 'Mumbai Market', state_name: 'Maharashtra', district_name: 'Mumbai', cmdt_name: 'Sugarcane', min_price: 3400, max_price: 4100, modal_price: 3750 },
  // Rajasthan - Barley
  { market_name: 'Jaipur Market', state_name: 'Rajasthan', district_name: 'Jaipur', cmdt_name: 'Barley', min_price: 1850, max_price: 2200, modal_price: 2020 },
  { market_name: 'Jodhpur Yard', state_name: 'Rajasthan', district_name: 'Jodhpur', cmdt_name: 'Barley', min_price: 1800, max_price: 2150, modal_price: 1970 },
  { market_name: 'Udaipur Market', state_name: 'Rajasthan', district_name: 'Udaipur', cmdt_name: 'Barley', min_price: 1900, max_price: 2250, modal_price: 2070 },
  // Rajasthan - Bajra
  { market_name: 'Jaipur Market', state_name: 'Rajasthan', district_name: 'Jaipur', cmdt_name: 'Bajra', min_price: 2500, max_price: 3180, modal_price: 2870 },
  { market_name: 'Jodhpur Yard', state_name: 'Rajasthan', district_name: 'Jodhpur', cmdt_name: 'Bajra', min_price: 2450, max_price: 3100, modal_price: 2800 },
  { market_name: 'Udaipur Market', state_name: 'Rajasthan', district_name: 'Udaipur', cmdt_name: 'Bajra', min_price: 2550, max_price: 3250, modal_price: 2920 },
  // Uttar Pradesh - Wheat
  { market_name: 'Lucknow Market', state_name: 'Uttar Pradesh', district_name: 'Lucknow', cmdt_name: 'Wheat', min_price: 2300, max_price: 2700, modal_price: 2500 },
  { market_name: 'Kanpur Yard', state_name: 'Uttar Pradesh', district_name: 'Kanpur', cmdt_name: 'Wheat', min_price: 2250, max_price: 2650, modal_price: 2450 },
  { market_name: 'Agra Market', state_name: 'Uttar Pradesh', district_name: 'Agra', cmdt_name: 'Wheat', min_price: 2350, max_price: 2750, modal_price: 2550 },
  // Uttar Pradesh - Mango
  { market_name: 'Lucknow Market', state_name: 'Uttar Pradesh', district_name: 'Lucknow', cmdt_name: 'Mango', min_price: 4300, max_price: 5900, modal_price: 5010 },
  { market_name: 'Kanpur Yard', state_name: 'Uttar Pradesh', district_name: 'Kanpur', cmdt_name: 'Mango', min_price: 4200, max_price: 5800, modal_price: 4950 },
  { market_name: 'Agra Market', state_name: 'Uttar Pradesh', district_name: 'Agra', cmdt_name: 'Mango', min_price: 4400, max_price: 6000, modal_price: 5100 }
]

const HARDCODED_FILTER_OPTIONS = {
  cmdt_data: [
    { id: 1, cmdt_name: 'Barley' },
    { id: 2, cmdt_name: 'Rice' },
    { id: 3, cmdt_name: 'Wheat' },
    { id: 4, cmdt_name: 'Groundnut' },
    { id: 5, cmdt_name: 'Ragi' },
    { id: 6, cmdt_name: 'Bajra' },
    { id: 7, cmdt_name: 'Onion' },
    { id: 8, cmdt_name: 'Sugarcane' },
    { id: 9, cmdt_name: 'Coconut' },
    { id: 10, cmdt_name: 'Mango' }
  ],
  state_data: [
    { id: 1, state_name: 'Tamil Nadu' },
    { id: 2, state_name: 'Karnataka' },
    { id: 3, state_name: 'Kerala' },
    { id: 4, state_name: 'Maharashtra' },
    { id: 5, state_name: 'Rajasthan' },
    { id: 6, state_name: 'Uttar Pradesh' }
  ],
  district_data: [],
  market_data: []
}

const toArray = (value) => (Array.isArray(value) ? value : value ? [value] : [])

const normalizeQueryParams = (params = {}) => {
  const normalized = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null && item !== '') {
          normalized.append(key, String(item))
        }
      })
      return
    }

    normalized.set(key, String(value))
  })

  return normalized
}

const buildReportBody = (params = {}) => Object.fromEntries(normalizeQueryParams(params))

const parseNumber = (value, fallback) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const buildAgmarknetQuery = (params = {}) => {
  const cropType = params.cropType || params.commodity || ''
  const region = params.region || params.state || ''
  const page = parseNumber(params.page, 1)
  const itemsPerPage = parseNumber(params.itemsPerPage, 10)
  const filters = {}

  if (cropType && cropType !== 'all') {
    filters['filters[commodity]'] = cropType
  }

  if (region && region !== 'all') {
    filters['filters[state]'] = region
  }

  return normalizeQueryParams({
    'api-key': AGMARKNET_API_KEY,
    format: 'json',
    offset: Math.max(page - 1, 0) * itemsPerPage,
    limit: itemsPerPage,
    ...filters
  })
}

const buildAgmarknetRequestBody = (params = {}) => {
  const query = buildAgmarknetQuery(params)
  const body = Object.fromEntries(query)

  if (body['api-key']) {
    body['api-key'] = '***'
  }

  return body
}

const extractLabel = (entry) =>
  entry?.cmdt_name ||
  entry?.state_name ||
  entry?.market_name ||
  entry?.district_name ||
  entry?.variety_name ||
  entry?.cmdt_group_name ||
  entry?.name ||
  entry?.label ||
  entry?.value ||
  ''

const normalizeOptions = (entries = []) => {
  const seen = new Set()

  return entries
    .map((entry) => {
      if (typeof entry === 'string') {
        return { label: entry, value: entry }
      }

      const label = extractLabel(entry)
      const value = entry?.id ?? entry?.value ?? label
      return label ? { label, value: String(value) } : null
    })
    .filter((entry) => {
      if (!entry) return false
      const key = entry.value.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
}

const normalizeLabel = (value) => String(value || '').toLowerCase().replace(/[\s_-]+/g, '')



const buildFallbackReportRows = (params = {}) => {
  const cropType = params.cropType || params.commodity || 'all'
  const region = params.region || params.state || 'all'
  const normalizedCrop = normalizeLabel(cropType)
  const normalizedRegion = normalizeLabel(region)

  return HARDCODED_MARKET_DATA.filter((item) => {
    const cropMatch = !normalizedCrop || normalizedCrop === 'all' || normalizeLabel(item.cmdt_name) === normalizedCrop
    const regionMatch = !normalizedRegion || normalizedRegion === 'all' || normalizeLabel(item.state_name) === normalizedRegion
    return cropMatch && regionMatch
  }).map((item) => ({
    id: item.market_name,
    name: item.cmdt_name,
    type: 'Commodity',
    region: item.state_name,
    location: item.market_name,
    minPrice: item.min_price,
    maxPrice: item.max_price,
    avgPrice: item.modal_price,
    market: item.market_name,
    district: item.district_name
  }))
}

const extractReportRows = (payload) => {
  const reportData = payload?.data?.data || payload?.data || payload || {}
  const records = reportData.records || reportData.rows || reportData.items || []

  if (!Array.isArray(records)) {
    return []
  }

  return records.map((record, index) => ({
    id: record.id || record.market_id || record.mkt_id || `${index}`,
    name: record.market_name || record.mkt_name || record.commodity || record.cmdt_name || record.label || 'Market',
    type: record.cmdt_group_name || record.type || record.group_name || record.category || '',
    region: record.state_name || record.state || record.district_name || record.location || '',
    location: record.market || record.market_name || record.district_name || record.location || '',
    minPrice: record.min_price ?? record.minPrice ?? record.low_price ?? record.price_min ?? record.price ?? 0,
    maxPrice: record.max_price ?? record.maxPrice ?? record.high_price ?? record.price_max ?? record.price ?? 0,
    avgPrice: record.avg_price ?? record.avgPrice ?? record.modal_price ?? record.price ?? 0
  }))
}

const fetchDailyPriceArrivalFiltersFromApi = async () => {
  return HARDCODED_FILTER_OPTIONS
}

const fetchDailyPriceArrivalReportFromApi = async (params = {}) => {
  if (!AGMARKNET_API_KEY) {
    throw new Error('Missing Agmarknet API key. Set VITE_AGMARKNET_API_KEY in your .env file.')
  }

  const query = buildAgmarknetQuery(params)
  const response = await fetch(`${AGMARKNET_API_URL}?${query.toString()}`)

  if (!response.ok) {
    throw new Error(`Agmarknet request failed with status ${response.status}.`)
  }

  const payload = await response.json()

  return {
    body: buildAgmarknetRequestBody(params),
    payload
  }
}

export const marketService = {
  getAll() {
    return marketPrices
  },

  async getFilterOptions() {
    try {
      const payload = await fetchDailyPriceArrivalFiltersFromApi()
      const data = payload?.data || payload || {}
      const commodities = normalizeOptions(toArray(data.cmdt_data || data.commodity_data || data.commodities))
      const states = normalizeOptions(toArray(data.state_data || data.states))
      const districts = normalizeOptions(toArray(data.district_data || data.districts))
      const markets = normalizeOptions(toArray(data.market_data || data.markets))

      return {
        cropTypes: commodities.length ? commodities.map((item) => item.label) : ['Barley', 'Rice', 'Wheat', 'Groundnut', 'Ragi', 'Bajra', 'Onion', 'Sugarcane', 'Coconut', 'Mango'],
        regions: states.length ? states.map((item) => item.label) : ['Tamil Nadu', 'Karnataka', 'Kerala', 'Maharashtra', 'Rajasthan', 'Uttar Pradesh'],
        districts: districts.map((item) => item.label),
        markets: markets.map((item) => item.label),
        raw: data
      }
    } catch {
      return {
        cropTypes: ['Barley', 'Rice', 'Wheat', 'Groundnut', 'Ragi', 'Bajra', 'Onion', 'Sugarcane', 'Coconut', 'Mango'],
        regions: ['Tamil Nadu', 'Karnataka', 'Kerala', 'Maharashtra', 'Rajasthan', 'Uttar Pradesh'],
        districts: [],
        markets: [],
        raw: null
      }
    }
  },

  filter({ cropType, region }) {
    return marketPrices.filter((item) => {
      const normalizedCrop = normalizeLabel(cropType)
      const normalizedRegion = normalizeLabel(region)
      const cropMatch = !normalizedCrop || normalizedCrop === 'all' || normalizeLabel(item.type) === normalizedCrop
      const regionMatch = !normalizedRegion || normalizedRegion === 'all' || normalizeLabel(item.region) === normalizedRegion
      return cropMatch && regionMatch
    })
  },

  getFavorites() {
    return storage.get(FAVORITES_KEY, [])
  },

  toggleFavorite(cropName) {
    const favorites = storage.get(FAVORITES_KEY, [])
    const exists = favorites.includes(cropName)
    const next = exists ? favorites.filter((item) => item !== cropName) : [...favorites, cropName]
    storage.set(FAVORITES_KEY, next)
    return next
  },

  buildDailyPriceArrivalRequest(params = {}) {
    return buildReportBody({
      dashboard: 'marketwise_price_arrival',
      downloadreport: false,
      downloadformat: 'csv',
      format: 'json',
      page: 1,
      itemsPerPage: 10,
      ...params
    })
  },

  async fetchDailyPriceArrivalReport(params = {}) {
    try {
      const { body, payload } = await fetchDailyPriceArrivalReportFromApi(params)
      const rows = extractReportRows(payload)

      return {
        source: 'agmarknet',
        requestBody: body,
        payload,
        rows: rows.length ? rows : buildFallbackReportRows(params),
        errorMessage: rows.length ? '' : 'No rows returned from Agmarknet. Showing fallback data instead.'
      }
    } catch (error) {
      return {
        source: 'fallback',
        requestBody: this.buildDailyPriceArrivalRequest(params),
        payload: null,
        rows: buildFallbackReportRows(params),
        errorMessage: error instanceof Error ? error.message : 'Live data request failed.'
      }
    }
  }
}
