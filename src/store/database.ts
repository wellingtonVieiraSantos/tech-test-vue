import { defineStore } from "pinia";
import * as XLSX from 'xlsx'

export type SpreadsheetRow = {
    ID: string
    EAN: string
    Name: string
    Status: 'ERRO' | 'OK' | 'INDISPONIVEL'
    Score: number
    Mirakl_Image: string
    BB_Image_Url: string
}


export const useDatabaseStore = defineStore('database', {
    state: () => ({
      spreadsheet: [] as SpreadsheetRow[],
      search: '',
      status: '' as SpreadsheetRow['Status'] | '',
      modalOpen: false,
      modalMode: '' as 'delete' | 'update' | 'create',
      selectedRow: undefined as SpreadsheetRow | undefined,
      ordenation: '' as string,
  }),

  actions: {
    async loadInitial() {
        const res = await fetch('/database.xlsx')
        const arrayBuffer = await res.arrayBuffer()
        const workbook = XLSX.read(arrayBuffer)
        
        const firstSheetName = workbook.SheetNames[0] as string
        const worksheet = workbook.Sheets[firstSheetName] as XLSX.WorkSheet
        
      this.spreadsheet = XLSX.utils.sheet_to_json(worksheet) as SpreadsheetRow[]
    },
    
    async saveSpreadsheet() {
        if(!this.spreadsheet.length) return
        const workbook = XLSX.utils.book_new()
        const worksheet = XLSX.utils.json_to_sheet(this.spreadsheet)
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
        XLSX.writeFile(workbook, 'database.xlsx')
    },
    
    create(row: SpreadsheetRow) {
      if(this.findById(row.ID)) return
      const normalizeRow = {
        ...row,
        Mirakl_Image: row.Mirakl_Image.trim() || 'N/A',
        BB_Image_Url: row.BB_Image_Url.trim() || 'N/A',
      }
      this.spreadsheet.push(normalizeRow)
      this.setCloseModal()
    },
    
    update(row: SpreadsheetRow) {
      const normalizeRow = {
        ...row,
        Mirakl_Image: row.Mirakl_Image.trim() || 'N/A',
        BB_Image_Url: row.BB_Image_Url.trim() || 'N/A',
      }
      this.spreadsheet = this.spreadsheet.map((item: SpreadsheetRow) => item.ID === row.ID ? normalizeRow : item)
      this.setCloseModal()
    },
    
    delete(id: string) {
      this.spreadsheet = this.spreadsheet.filter((item: SpreadsheetRow) => item.ID !== id)
      this.setCloseModal()
    },
    
    setOpenModal(mode: 'delete' | 'update' | 'create', row?: SpreadsheetRow) {
      this.modalOpen = true
      this.modalMode = mode
      this.selectedRow = row || undefined
    },
    
    setCloseModal() {
      this.modalOpen = false
      this.selectedRow = undefined
    },

    setSearch(search: string) {
      this.search = search
    },
    setStatus(status: SpreadsheetRow['Status'] | '') {
      this.status = status
    },
    setOrdenation(ordenation: string) {
      this.ordenation = ordenation
    },

    resetFilters() {
      this.search = ''
      this.status = ''
      this.ordenation = ''
    }

  },
    getters: {
      findById: (state) => (id: string) => state.spreadsheet.find((item) => item.ID === id),
      findTotalProductsWithImage: (state) => state.spreadsheet.filter((item) => item.Mirakl_Image !== 'N/A' || item.BB_Image_Url !== 'N/A').length,
      findTotalProductsUnvailable: (state) => state.spreadsheet.filter((item) => item.Status === 'INDISPONIVEL').length,
      findTotalProductsOk: (state) => state.spreadsheet.filter((item) => item.Status === 'OK').length,
      findAverageScore: (state) =>
        state.spreadsheet.length
          ? state.spreadsheet.reduce((acc, i) => acc + i.Score, 0) / state.spreadsheet.length
          : 0,
      filteredSpreadsheet: (state) => {
        const text = state.search.trim().toLowerCase()
        const ordenation = state.ordenation
        let filtered = [...state.spreadsheet]

        switch (ordenation) {
          case 'name-asc':
            filtered.sort((a, b) => a.Name.localeCompare(b.Name))
            break
          case 'name-desc':
            filtered.sort((a, b) => b.Name.localeCompare(a.Name))
            break
          case 'score-asc':
            filtered.sort((a, b) => a.Score - b.Score)
            break
          case 'score-desc':
            filtered.sort((a, b) => b.Score - a.Score)
            break
          default:
            filtered.sort((a, b) => a.ID.localeCompare(b.ID))
        }

        return filtered.filter(item => {
          const matchText =
            !text ||
            item.Name.toLowerCase().includes(text) ||
            item.EAN.toLowerCase().includes(text) ||
            item.ID.toLowerCase().includes(text)

          const matchStatus =
            !state.status || item.Status === state.status

          return matchText && matchStatus
        })
      }
    } 
})