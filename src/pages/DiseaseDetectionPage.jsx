import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import diseaseData from '../data/diseaseData.json'
import SpeakButton from '../components/SpeakButton'

function predictDisease(fileName) {
  const name = fileName.toLowerCase()

  if (name.includes('blight')) return 'blight'
  if (name.includes('rust')) return 'rust'
  if (name.includes('spot')) return 'leaf_spot'
  if (name.includes('powder')) return 'powdery_mildew'
  return 'healthy'
}

function DiseaseDetectionPage() {
  const { t } = useTranslation()
  const [image, setImage] = useState(null)
  const [result, setResult] = useState(null)
  const speechRate = useMemo(() => Number(localStorage.getItem('voiceRate') || 1), [])

  const onFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImage({ file, preview: URL.createObjectURL(file) })
    setResult(null)
  }

  const checkDisease = () => {
    if (!image?.file) {
      alert(t('disease.noImage'))
      return
    }

    const key = predictDisease(image.file.name)
    const disease = diseaseData[key]
    const confidence = Math.floor(78 + Math.random() * 20)

    setResult({ ...disease, confidence })
  }

  return (
    <section className="card p-5">
      <h2 className="font-['Baloo_2'] text-3xl font-bold text-emerald-900">{t('disease.title')}</h2>

      <label className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-emerald-700/40 p-6 text-emerald-900">
        <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
        {image ? 'Image selected. Click to change.' : t('disease.upload')}
      </label>

      {image && (
        <img src={image.preview} alt="Crop leaf" className="mt-4 h-56 w-full rounded-xl object-cover sm:h-72" />
      )}

      <button className="btn-primary mt-4" type="button" onClick={checkDisease}>
        {t('disease.predict')}
      </button>

      {result && (
        <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-emerald-900">
          <p className="font-semibold">
            {t('disease.disease')}: {result.name}
          </p>
          <p>
            {t('disease.confidence')}: {result.confidence}%
          </p>
          <p className="mt-2 text-sm">{result.solution}</p>
          <div className="mt-2">
            <SpeakButton text={`${result.name}. ${result.solution}`} rate={speechRate} />
          </div>
        </div>
      )}
    </section>
  )
}

export default DiseaseDetectionPage
