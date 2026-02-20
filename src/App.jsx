import { useMemo, useState } from 'react'

const TAX_RATE = 0.1215
const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)

const parseCurrency = (rawValue) => {
  const digits = rawValue.replace(/[^\d]/g, '')
  if (!digits) return 0
  return Number(digits) / 100
}

export default function App() {
  const [budgetInput, setBudgetInput] = useState('')

  const budgetValue = useMemo(() => parseCurrency(budgetInput), [budgetInput])
  const taxValue = useMemo(() => budgetValue * TAX_RATE, [budgetValue])
  const totalValue = useMemo(() => {
    if (!budgetValue) return 0
    return budgetValue / (1 - TAX_RATE)
  }, [budgetValue])
  const netValue = useMemo(() => budgetValue - taxValue, [budgetValue, taxValue])

  const handleBudgetChange = (event) => {
    const digits = event.target.value.replace(/[^\d]/g, '')
    if (!digits) {
      setBudgetInput('')
      return
    }
    const nextValue = Number(digits) / 100
    setBudgetInput(formatCurrency(nextValue))
  }

  const handleClear = () => {
    setBudgetInput('')
  }

  const logoSrc = `${import.meta.env.BASE_URL}mediak-logo.png`

  return (
    <div className="page">
      <main className="calculator">
        <div className="calculator-header">
          <img className="brand-logo" src={logoSrc} alt="media.k" />
          <div>
            <p className="eyebrow">Media.k</p>
            <h1>Calculadora de Imposto do Meta Ads</h1>
            <p className="lead">
              Informe o orçamento para ver o imposto (12,15%), o valor total a
              pagar e o investimento líquido.
            </p>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-header">
            <h2>1) Orçamento do Meta Ads</h2>
            <p>Digite o valor do investimento</p>
          </div>
          <div className="input-row">
            <label className="currency-input">
              <span>R$</span>
              <input
                type="text"
                inputMode="numeric"
                value={budgetInput}
                onChange={handleBudgetChange}
                aria-label="Orcamento do Meta Ads"
              />
            </label>
            <button className="ghost-button" type="button" onClick={handleClear}>
              Limpar
            </button>
          </div>
          <div className="results-table">
            <div className="results-header">
              <span>1) Orçamento</span>
              <span>2) Taxa de imposto do Meta Ads</span>
              <span>3) Correção de valor para manter o orçamento</span>
              <span>4) Imposto em R$</span>
              <span>5) Investimento líquido mantendo o valor (Orçamento - Imposto)</span>
            </div>
            <div className="results-row">
              <strong>{formatCurrency(budgetValue)}</strong>
              <strong>12,15%</strong>
              <strong>{formatCurrency(totalValue)}</strong>
              <strong>{formatCurrency(taxValue)}</strong>
              <strong>{formatCurrency(netValue)}</strong>
            </div>
          </div>
          <p className="note">
            Observação: A alíquota utilizada é de <strong>12,15%</strong>.
          </p>
        </div>
      </main>
    </div>
  )
}
