import { describe, it, expect } from 'vitest'
import { idGenerator } from '../idGenerator'

describe('idGenerator', () => {
  it('deve gerar um ID com formato correto (letra + 7 dígitos)', () => {
    const id = idGenerator()
    
    expect(id).toHaveLength(8)
    
    expect(id[0]).toMatch(/[A-Z]/)
    
    expect(id.slice(1)).toMatch(/^\d{7}$/)
  })

  it('deve gerar IDs únicos', () => {
    const ids = new Set()
    
    for (let i = 0; i < 100; i++) {
      ids.add(idGenerator())
    }
    
    expect(ids.size).toBe(100)
  })

  it('deve gerar IDs com letras entre A-Z', () => {
    const ids = Array.from({ length: 50 }, () => idGenerator())
    
    ids.forEach(id => {
      const letter = id[0]!
      expect(letter.charCodeAt(0)).toBeGreaterThanOrEqual(65)
      expect(letter.charCodeAt(0)).toBeLessThanOrEqual(90)
    })
  })

  it('deve preencher com zeros à esquerda quando necessário', () => {
    const id = idGenerator()
    const digits = id.slice(1)
    
    expect(digits).toHaveLength(7)
    expect(digits).toMatch(/^\d{7}$/)
  })
})
