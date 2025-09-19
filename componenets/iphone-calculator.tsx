"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PricingData {
  [key: string]: {
    base: number
    series: string
  }
}

interface DeductionRules {
  [series: string]: {
    battery: { [key: string]: number }
    faceid: { [key: string]: number }
    backglass: { [key: string]: number }
    screen: { [key: string]: number }
    body: { [key: string]: number }
    sim?: { [key: string]: number }
  }
}

const pricingData: PricingData = {
  "x-64": { base: 150000, series: "x" },
  "x-256": { base: 170000, series: "x" },
  "xs-64": { base: 180000, series: "x" },
  "xs-256": { base: 200000, series: "x" },
  "xr-64": { base: 170000, series: "x" },
  "xr-128": { base: 200000, series: "x" },
  "xsmax-64": { base: 220000, series: "xsmax" },
  "xsmax-256": { base: 250000, series: "xsmax" },
  "11-64": { base: 240000, series: "11" },
  "11-128": { base: 270000, series: "11" },
  "11pro-64": { base: 300000, series: "11" },
  "11pro-256": { base: 330000, series: "11" },
  "11promax-64": { base: 340000, series: "11promax" },
  "11promax-256": { base: 370000, series: "11promax" },
  "12-64": { base: 270000, series: "12" },
  "12-128": { base: 310000, series: "12" },
  "12pro-128": { base: 370000, series: "12" },
  "12pro-256": { base: 400000, series: "12" },
  "12promax-128": { base: 470000, series: "12promax" },
  "12promax-256": { base: 500000, series: "12promax" },
  "13-128": { base: 400000, series: "13" },
  "13-256": { base: 440000, series: "13" },
  "13mini-128": { base: 350000, series: "13" },
  "13mini-256": { base: 380000, series: "13" },
  "13pro-128": { base: 500000, series: "13pro" },
  "13pro-256": { base: 560000, series: "13pro" },
  "13promax-128": { base: 600000, series: "13pro" },
  "13promax-256": { base: 650000, series: "13pro" },
  "14-128": { base: 500000, series: "14" },
  "14-256": { base: 550000, series: "14" },
  "14pro-128": { base: 700000, series: "14" },
  "14pro-256": { base: 750000, series: "14" },
  "14promax-128": { base: 780000, series: "14promax" },
  "14promax-256": { base: 820000, series: "14promax" },
  "14promax-512": { base: 850000, series: "14promax" },
  "15-128": { base: 750000, series: "14promax" },
  "15-256": { base: 790000, series: "14promax" },
  "15pro-128": { base: 900000, series: "15pro" },
  "15pro-256": { base: 930000, series: "15pro" },
  "15pro-512": { base: 980000, series: "15pro" },
  "15promax-256": { base: 1000000, series: "15pro" },
  "15promax-512": { base: 1050000, series: "15pro" },
  "16-128": { base: 950000, series: "16" },
  "16-256": { base: 1000000, series: "16" },
  "16-512": { base: 1050000, series: "16" },
}

const deductionRules: DeductionRules = {
  x: {
    battery: { "90+": 0, "84-90": 5000, "79-84": 10000, "78-": 20000, changed: 30000 },
    faceid: { working: 0, "not-working": 50000 },
    backglass: { mint: 0, minor: 5000, broken: 15000 },
    screen: { mint: 0, changed: 20000, cracked: 35000 },
    body: { mint: 0, minor: 10000, dents: 15000 },
  },
  xsmax: {
    battery: { "90+": 0, "84-90": 5000, "79-84": 10000, "78-": 20000, changed: 20000 },
    faceid: { working: 0, "not-working": 60000 },
    backglass: { mint: 0, minor: 10000, broken: 15000 },
    screen: { mint: 0, changed: 30000, cracked: 50000 },
    body: { mint: 0, minor: 10000, dents: 20000 },
  },
  "11": {
    battery: { "90+": 0, "84-90": 5000, "79-84": 10000, "78-": 20000, changed: 30000 },
    faceid: { working: 0, "not-working": 50000 },
    backglass: { mint: 0, minor: 5000, broken: 15000 },
    screen: { mint: 0, changed: 30000, cracked: 40000 },
    body: { mint: 0, minor: 10000, dents: 15000 },
  },
  "11promax": {
    battery: { "90+": 0, "84-90": 5000, "79-84": 10000, "78-": 25000, changed: 20000 },
    faceid: { working: 0, "not-working": 75000 },
    backglass: { mint: 0, minor: 10000, broken: 15000 },
    screen: { mint: 0, changed: 30000, cracked: 50000 },
    body: { mint: 0, minor: 10000, dents: 20000 },
  },
  "12": {
    battery: { "90+": 0, "84-90": 5000, "79-84": 10000, "78-": 25000, changed: 30000 },
    faceid: { working: 0, "not-working": 80000 },
    backglass: { mint: 0, minor: 10000, broken: 15000 },
    screen: { mint: 0, changed: 30000, cracked: 50000 },
    body: { mint: 0, minor: 10000, dents: 20000 },
  },
  "12promax": {
    battery: { "90+": 0, "84-90": 5000, "79-84": 10000, "78-": 25000, changed: 40000 },
    faceid: { working: 0, "not-working": 100000 },
    backglass: { mint: 0, minor: 10000, broken: 20000 },
    screen: { mint: 0, changed: 40000, cracked: 80000 },
    body: { mint: 0, minor: 15000, dents: 25000 },
  },
  "13": {
    battery: { "90+": 0, "84-90": 5000, "79-84": 10000, "78-": 25000, changed: 30000 },
    faceid: { working: 0, "not-working": 80000 },
    backglass: { mint: 0, minor: 10000, broken: 20000 },
    screen: { mint: 0, changed: 30000, cracked: 50000 },
    body: { mint: 0, minor: 10000, dents: 20000 },
  },
  "13pro": {
    battery: { "90+": 0, "84-90": 10000, "79-84": 20000, "78-": 30000, changed: 30000 },
    faceid: { working: 0, "not-working": 100000 },
    backglass: { mint: 0, minor: 20000, broken: 30000 },
    screen: { mint: 0, changed: 100000, cracked: 150000 },
    body: { mint: 0, minor: 15000, dents: 25000 },
  },
  "14": {
    battery: { "90+": 0, "84-90": 10000, "79-84": 20000, "78-": 40000, changed: 30000 },
    faceid: { working: 0, "not-working": 150000 },
    backglass: { mint: 0, minor: 15000, broken: 30000 },
    screen: { mint: 0, changed: 100000, cracked: 130000 },
    body: { mint: 0, minor: 20000, dents: 30000 },
    sim: { physical: 0, esim: 50000 },
  },
  "14promax": {
    battery: { "90+": 0, "84-90": 10000, "79-84": 20000, "78-": 40000, changed: 30000 },
    faceid: { working: 0, "not-working": 200000 },
    backglass: { mint: 0, minor: 15000, broken: 30000 },
    screen: { mint: 0, changed: 140000, cracked: 180000 },
    body: { mint: 0, minor: 30000, dents: 40000 },
    sim: { physical: 0, esim: 50000 },
  },
  "15pro": {
    battery: { "90+": 0, "84-90": 15000, "79-84": 30000, "78-": 50000, changed: 40000 },
    faceid: { working: 0, "not-working": 200000 },
    backglass: { mint: 0, minor: 15000, broken: 30000 },
    screen: { mint: 0, changed: 200000, cracked: 250000 },
    body: { mint: 0, minor: 30000, dents: 40000 },
    sim: { physical: 0, esim: 100000 },
  },
  "16": {
    battery: { "90+": 0, "84-90": 15000, "79-84": 30000, "78-": 50000, changed: 40000 },
    faceid: { working: 0, "not-working": 200000 },
    backglass: { mint: 0, minor: 15000, broken: 30000 },
    screen: { mint: 0, changed: 200000, cracked: 250000 },
    body: { mint: 0, minor: 30000, dents: 40000 },
    sim: { physical: 0, esim: 100000 },
  },
}

export function IPhoneCalculator() {
  const [formData, setFormData] = useState({
    model: "",
    battery: "",
    faceid: "",
    backglass: "",
    screen: "",
    body: "",
    sim: "physical",
  })
  const [result, setResult] = useState<{
    finalPrice: number
    breakdown: Array<{ name: string; value: number; type: "base" | "deduction" }>
    totalDeductions: number
  } | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isNewerModel = (model: string) => {
    return model.startsWith("14") || model.startsWith("15") || model.startsWith("16")
  }

  const calculatePrice = (e: React.FormEvent) => {
    e.preventDefault()

    const { model, battery, faceid, backglass, screen, body, sim } = formData

    if (!model || !battery || !faceid || !backglass || !screen || !body) {
      alert("Please fill in all required fields")
      return
    }

    const modelData = pricingData[model]
    const rules = deductionRules[modelData.series]

    const basePrice = modelData.base
    let totalDeductions = 0
    const breakdown = [{ name: "Base Price", value: basePrice, type: "base" as const }]

    const deductions = [
      { name: "Battery Health", value: rules.battery[battery] },
      { name: "Face ID", value: rules.faceid[faceid] },
      { name: "Back Glass", value: rules.backglass[backglass] },
      { name: "Screen Condition", value: rules.screen[screen] },
      { name: "Body Condition", value: rules.body[body] },
    ]

    if (rules.sim && sim) {
      deductions.push({ name: "SIM Type", value: rules.sim[sim] })
    }

    deductions.forEach((deduction) => {
      if (deduction.value > 0) {
        totalDeductions += deduction.value
        breakdown.push({ name: deduction.name, value: deduction.value, type: "deduction" })
      }
    })

    const finalPrice = basePrice - totalDeductions

    setResult({ finalPrice, breakdown, totalDeductions })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center text-white mb-8 animate-in fade-in-0 slide-in-from-top-4 duration-800">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">📱 iPhone Trade-in Calculator</h1>
        <p className="text-lg opacity-95">Calculate instant buyback prices for iPhone swap deals</p>
      </div>

      <Card className="p-6 md:p-8 shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-800">
        <form onSubmit={calculatePrice} className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
              <h3 className="text-xl font-semibold text-gray-800">Device Information</h3>
            </div>

            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                iPhone Model
              </label>
              <select
                id="model"
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                required
              >
                <option value="">Select iPhone Model</option>
                <optgroup label="iPhone X Series">
                  <option value="x-64">iPhone X 64GB</option>
                  <option value="x-256">iPhone X 256GB</option>
                  <option value="xs-64">iPhone XS 64GB</option>
                  <option value="xs-256">iPhone XS 256GB</option>
                  <option value="xr-64">iPhone XR 64GB</option>
                  <option value="xr-128">iPhone XR 128GB</option>
                  <option value="xsmax-64">iPhone XS Max 64GB</option>
                  <option value="xsmax-256">iPhone XS Max 256GB</option>
                </optgroup>
                <optgroup label="iPhone 11 Series">
                  <option value="11-64">iPhone 11 64GB</option>
                  <option value="11-128">iPhone 11 128GB</option>
                  <option value="11pro-64">iPhone 11 Pro 64GB</option>
                  <option value="11pro-256">iPhone 11 Pro 256GB</option>
                  <option value="11promax-64">iPhone 11 Pro Max 64GB</option>
                  <option value="11promax-256">iPhone 11 Pro Max 256GB</option>
                </optgroup>
                <optgroup label="iPhone 12 Series">
                  <option value="12-64">iPhone 12 64GB</option>
                  <option value="12-128">iPhone 12 128GB</option>
                  <option value="12pro-128">iPhone 12 Pro 128GB</option>
                  <option value="12pro-256">iPhone 12 Pro 256GB</option>
                  <option value="12promax-128">iPhone 12 Pro Max 128GB</option>
                  <option value="12promax-256">iPhone 12 Pro Max 256GB</option>
                </optgroup>
                <optgroup label="iPhone 13 Series">
                  <option value="13-128">iPhone 13 128GB</option>
                  <option value="13-256">iPhone 13 256GB</option>
                  <option value="13mini-128">iPhone 13 Mini 128GB</option>
                  <option value="13mini-256">iPhone 13 Mini 256GB</option>
                  <option value="13pro-128">iPhone 13 Pro 128GB</option>
                  <option value="13pro-256">iPhone 13 Pro 256GB</option>
                  <option value="13promax-128">iPhone 13 Pro Max 128GB</option>
                  <option value="13promax-256">iPhone 13 Pro Max 256GB</option>
                </optgroup>
                <optgroup label="iPhone 14 Series">
                  <option value="14-128">iPhone 14 128GB</option>
                  <option value="14-256">iPhone 14 256GB</option>
                  <option value="14pro-128">iPhone 14 Pro 128GB</option>
                  <option value="14pro-256">iPhone 14 Pro 256GB</option>
                  <option value="14promax-128">iPhone 14 Pro Max 128GB</option>
                  <option value="14promax-256">iPhone 14 Pro Max 256GB</option>
                  <option value="14promax-512">iPhone 14 Pro Max 512GB</option>
                </optgroup>
                <optgroup label="iPhone 15 Series">
                  <option value="15-128">iPhone 15 128GB</option>
                  <option value="15-256">iPhone 15 256GB</option>
                  <option value="15pro-128">iPhone 15 Pro 128GB</option>
                  <option value="15pro-256">iPhone 15 Pro 256GB</option>
                  <option value="15pro-512">iPhone 15 Pro 512GB</option>
                  <option value="15promax-256">iPhone 15 Pro Max 256GB</option>
                  <option value="15promax-512">iPhone 15 Pro Max 512GB</option>
                </optgroup>
                <optgroup label="iPhone 16 Series">
                  <option value="16-128">iPhone 16 128GB</option>
                  <option value="16-256">iPhone 16 256GB</option>
                  <option value="16-512">iPhone 16 512GB</option>
                </optgroup>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
              <h3 className="text-xl font-semibold text-gray-800">Device Condition</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label htmlFor="battery" className="block text-sm font-medium text-gray-700 mb-2">
                  Battery Health
                </label>
                <select
                  id="battery"
                  value={formData.battery}
                  onChange={(e) => handleInputChange("battery", e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  required
                >
                  <option value="">Select Battery Condition</option>
                  <option value="90+">90% and above</option>
                  <option value="84-90">84-90%</option>
                  <option value="79-84">79-84%</option>
                  <option value="78-">78% and below</option>
                  <option value="changed">Changed Battery (Non-Original)</option>
                </select>
              </div>

              <div>
                <label htmlFor="faceid" className="block text-sm font-medium text-gray-700 mb-2">
                  Face ID Status
                </label>
                <select
                  id="faceid"
                  value={formData.faceid}
                  onChange={(e) => handleInputChange("faceid", e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  required
                >
                  <option value="">Select Face ID Status</option>
                  <option value="working">Face ID Working</option>
                  <option value="not-working">No Face ID</option>
                </select>
              </div>

              <div>
                <label htmlFor="backglass" className="block text-sm font-medium text-gray-700 mb-2">
                  Back Glass Condition
                </label>
                <select
                  id="backglass"
                  value={formData.backglass}
                  onChange={(e) => handleInputChange("backglass", e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  required
                >
                  <option value="">Select Back Glass</option>
                  <option value="mint">Mint (No scratches/dents)</option>
                  <option value="minor">Small scratches/dents</option>
                  <option value="broken">Broken back glass</option>
                </select>
              </div>

              <div>
                <label htmlFor="screen" className="block text-sm font-medium text-gray-700 mb-2">
                  Screen Condition
                </label>
                <select
                  id="screen"
                  value={formData.screen}
                  onChange={(e) => handleInputChange("screen", e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  required
                >
                  <option value="">Select Screen</option>
                  <option value="mint">Mint Screen (Original)</option>
                  <option value="changed">Changed Screen (Non-Original)</option>
                  <option value="cracked">Cracked Screen</option>
                </select>
              </div>

              <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                  Body Condition
                </label>
                <select
                  id="body"
                  value={formData.body}
                  onChange={(e) => handleInputChange("body", e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  required
                >
                  <option value="">Select Body Condition</option>
                  <option value="mint">No scratches/dents</option>
                  <option value="minor">Minor scuffs/scratches</option>
                  <option value="dents">Visible dents</option>
                </select>
              </div>

              {isNewerModel(formData.model) && (
                <div>
                  <label htmlFor="sim" className="block text-sm font-medium text-gray-700 mb-2">
                    SIM Status
                  </label>
                  <select
                    id="sim"
                    value={formData.sim}
                    onChange={(e) => handleInputChange("sim", e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  >
                    <option value="physical">Physical SIM</option>
                    <option value="esim">eSIM Only</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1 italic">For iPhone 14 and newer models</p>
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Calculate Trade-in Value
          </Button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-indigo-200 animate-in fade-in-0 slide-in-from-left-4 duration-500">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              💰 Trade-in Value Calculation
            </h3>

            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-indigo-600 animate-in zoom-in-50 duration-600">
                ₦{result.finalPrice.toLocaleString()}
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-700 mb-4">Price Breakdown:</h4>
              <div className="space-y-3">
                {result.breakdown.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-gray-700">{item.name}</span>
                    <span className={`font-medium ${item.type === "base" ? "text-green-600" : "text-red-600"}`}>
                      {item.type === "base" ? "" : "-"}₦{item.value.toLocaleString()}
                    </span>
                  </div>
                ))}

                <div className="bg-blue-50 p-4 rounded-lg mt-4 border-t-2 border-indigo-500">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800">Total Deductions</span>
                    <span className="font-bold text-red-600">-₦{result.totalDeductions.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
