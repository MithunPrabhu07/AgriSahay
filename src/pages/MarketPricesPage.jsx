import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { marketService } from '../services/marketService'

function MarketPricesPage() {
  const { t } = useTranslation()
  const fallbackRows = marketService.getAll()
  const [cropType, setCropType] = useState('all')
  const [region, setRegion] = useState('all')
  const [favorites, setFavorites] = useState(marketService.getFavorites())
  const [filterOptions, setFilterOptions] = useState({ cropTypes: [], regions: [] })
  const [reportRows, setReportRows] = useState(fallbackRows)
  const [requestBody, setRequestBody] = useState(marketService.buildDailyPriceArrivalRequest({}))
  const [reportSource, setReportSource] = useState('fallback')
  const [loadingFilters, setLoadingFilters] = useState(true)
  const [loadingReport, setLoadingReport] = useState(false)
  const [error, setError] = useState('')

  const regions = useMemo(() => ['all', ...filterOptions.regions], [filterOptions.regions])
  const cropTypes = useMemo(() => ['all', ...filterOptions.cropTypes], [filterOptions.cropTypes])

  const toggleFavorite = (name) => {
    setFavorites(marketService.toggleFavorite(name))
  }

  const handleCropTypeChange = (event) => {
    setCropType(event.target.value)
  }

  const handleRegionChange = (event) => {
    setRegion(event.target.value)
  }

  const handleSearch = () => {
    loadReport({ cropType, region })
  }

  const loadReport = async (filters = { cropType, region }) => {
    setLoadingReport(true)
    setError('')

    const result = await marketService.fetchDailyPriceArrivalReport({
      cropType: filters.cropType,
      region: filters.region,
      page: 1,
      itemsPerPage: 12
    })

    setReportRows(result.rows)
    setRequestBody(result.requestBody)
    setReportSource(result.source)
    setError(
      result.errorMessage || (result.source === 'fallback' ? 'Using local fallback data because the live API was not reachable.' : ''),
    )
    setLoadingReport(false)
  }

  useEffect(() => {
    let isMounted = true

    const loadFilters = async () => {
      setLoadingFilters(true)

      try {
        const options = await marketService.getFilterOptions()
        if (!isMounted) return

        setFilterOptions({
          cropTypes: options.cropTypes || [],
          regions: options.regions || []
        })
      } finally {
        if (isMounted) {
          setLoadingFilters(false)
        }
      }
    }

    loadFilters()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="grid gap-4">
      <section className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-['Baloo_2'] text-3xl font-bold text-emerald-900">{t('market.title')}</h2>
            <p className="text-sm text-emerald-800/80">Live request contract for the market-wise daily price-arrival report.</p>
          </div>
          <button type="button" onClick={() => loadReport({ cropType, region })} className="btn-primary px-4 py-2 text-sm">
            Refresh Report
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-emerald-900">{t('market.cropType')}</label>
            <select
              value={cropType}
              onChange={handleCropTypeChange}
              className="w-full rounded-xl border border-emerald-900/20 bg-white px-3 py-2"
              disabled={loadingFilters}
            >
              {cropTypes.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-emerald-900">{t('market.region')}</label>
            <select
              value={region}
              onChange={handleRegionChange}
              className="w-full rounded-xl border border-emerald-900/20 bg-white px-3 py-2"
              disabled={loadingFilters}
            >
              {regions.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleSearch}
              className="btn-primary w-full px-4 py-2 text-sm"
              disabled={loadingFilters || loadingReport}
            >
              Search
            </button>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-emerald-900/10 bg-emerald-50 p-3 text-sm text-emerald-900">
          <p className="font-semibold">Request body</p>
          <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap break-words text-xs text-emerald-800">
            {JSON.stringify(requestBody, null, 2)}
          </pre>
        </div>
      </section>

      <section className="card p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-emerald-900/80">
          <p>{loadingReport ? 'Loading report...' : `Report source: ${reportSource}`}</p>
          <p>{error || `${reportRows.length} rows loaded`}</p>
        </div>
      </section>

      <section className="grid gap-3">
        {reportRows.map((item) => {
          const isFavorite = favorites.includes(item.name)
          return (
            <article key={item.name + item.location} className="card p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-emerald-900">{item.name}</h3>
                <button type="button" onClick={() => toggleFavorite(item.name)} className="btn-muted py-2 text-sm">
                  {isFavorite ? t('market.remove') : t('market.save')}
                </button>
              </div>
              <p className="text-sm text-emerald-800/80">
                {t('market.location')}: {item.location}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                <div className="rounded-lg bg-emerald-50 p-2 text-center text-emerald-900">
                  <p className="font-semibold">Rs {item.minPrice}</p>
                  <p>{t('market.min')}</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-2 text-center text-emerald-900">
                  <p className="font-semibold">Rs {item.maxPrice}</p>
                  <p>{t('market.max')}</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-2 text-center text-emerald-900">
                  <p className="font-semibold">Rs {item.avgPrice}</p>
                  <p>{t('market.avg')}</p>
                </div>
              </div>
            </article>
          )
        })}

        {!loadingReport && !reportRows.length ? (
          <div className="card p-6 text-sm text-emerald-800/80">No report rows matched the selected filters.</div>
        ) : null}
      </section>
    </div>
  )
}

export default MarketPricesPage
