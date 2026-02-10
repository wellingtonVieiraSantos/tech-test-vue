import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, it, expect } from 'vitest'
import { useDatabaseStore } from '../database'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('useDatabaseStore', () => {

  describe('actions', () => {

    it('deve adicionar item normalizado e fecha o modal', () => {
      const store = useDatabaseStore()

      store.create({
        ID: '1',
        EAN: '123',
        Name: 'Produto',
        Status: 'OK',
        Score: 0.8,
        Mirakl_Image: '   ',
        BB_Image_Url: ''
      })

      expect(store.spreadsheet).toHaveLength(1)
      expect(store.spreadsheet[0]?.Mirakl_Image).toBe('N/A')
      expect(store.modalOpen).toBe(false)
    })

    it('deve atualizar item existente', () => {
      const store = useDatabaseStore()

      store.spreadsheet = [{
        ID: '1',
        EAN: '123',
        Name: 'Produto',
        Status: 'OK',
        Score: 0.8,
        Mirakl_Image: 'img',
        BB_Image_Url: 'img'
      }]

      store.update({
        ID: '1',
        EAN: '123',
        Name: 'Atualizado',
        Status: 'OK',
        Score: 1,
        Mirakl_Image: '',
        BB_Image_Url: ''
      })

      expect(store.spreadsheet[0]?.Name).toBe('Atualizado')
      expect(store.spreadsheet[0]?.Mirakl_Image).toBe('N/A')
    })
  
    it('deve remover item por ID', () => {
      const store = useDatabaseStore()

      store.spreadsheet = [{
        ID: '1',
        EAN: '123',
        Name: 'Produto',
        Status: 'OK',
        Score: 0.8,
        Mirakl_Image: 'img',
        BB_Image_Url: 'img'
      }]

      store.delete('1')

      expect(store.spreadsheet).toHaveLength(0)
    })
  })

  describe('getters', () => {
    it('deve filtrar por texto e status', () => {
      const store = useDatabaseStore()

      store.spreadsheet = [
      { ID: '1', EAN: '111', Name: 'Camiseta', Status: 'OK', Score: 1, Mirakl_Image: 'N/A', BB_Image_Url: 'N/A' },
      { ID: '2', EAN: '222', Name: 'Calça', Status: 'ERRO', Score: 0.5, Mirakl_Image: 'N/A', BB_Image_Url: 'N/A' }
    ]

      store.setSearch('cam')
      store.setStatus('OK')

      expect(store.filteredSpreadsheet).toHaveLength(1)
      expect(store.filteredSpreadsheet[0]?.Name).toBe('Camiseta')
    })
  
    it('deve calcular média corretamente', () => {
      const store = useDatabaseStore()

      store.spreadsheet = [
      { ID: '1', EAN: '1', Name: 'A', Status: 'OK', Score: 1, Mirakl_Image: 'N/A', BB_Image_Url: 'N/A' },
      { ID: '2', EAN: '2', Name: 'B', Status: 'OK', Score: 0, Mirakl_Image: 'N/A', BB_Image_Url: 'N/A' }
    ]

      expect(store.findAverageScore).toBe(0.5)
    })

    it('deve retornar 0 para array vazio', () => {
      const store = useDatabaseStore()

      store.spreadsheet = []

      expect(store.findAverageScore).toBe(0)
    })
  })
})