import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTable from '../BaseTable.vue'

describe('BaseTable', () => {
  const mockData = [
    { nome: 'João', idade: 25 },
    { nome: 'Maria', idade: 30 },
    { nome: 'Pedro', idade: 35 }
  ]

 it('deve renderizar headers e linhas corretamente', () => {
    const wrapper = mount(BaseTable, {
        props: {
            headers: ['nome', 'idade'],
            rows: mockData,
            rowKey: (row) => row.nome
        }
    })
   
    const ths = wrapper.findAll('[data-slot="table-header-cell"]')
    expect(ths).toHaveLength(2)
    expect(ths[0]?.text()).toBe('nome')
    expect(ths[1]?.text()).toBe('idade')

    const tds = wrapper.findAll('[data-slot="table-cell"]')
    expect(tds.map(td => td.text())).toEqual([
      'João', '25',
      'Maria', '30',
      'Pedro', '35'
    ])
 })

 it('deve renderizar o slot no-data quando não houver dados', () => {
    const wrapper = mount(BaseTable, {
      props: {
        headers: ['nome', 'idade'],
        rows: [],
        rowKey: (row) => row.nome
      },
      slots: {
        'no-data': '<p>Nenhum dado encontrado para a sua busca</p>'
      }
    })

    expect(wrapper.text()).toContain('Nenhum dado encontrado para a sua busca')
    expect(wrapper.findAll('td')).toHaveLength(0)
  })

 it('deve renderizar o slot cell-Actions na coluna correta', () => {
    const wrapper = mount(BaseTable, {
      props: {
        headers: ['nome', 'idade', 'Actions'],
        rows: mockData,
        rowKey: (row) => row.nome
      },
      slots: {
        'cell-Actions': '<button>Actions</button>'
      }
    })

    const ths = wrapper.findAll('[data-slot="table-header-cell"]')
    expect(ths[2]?.text()).toBe('Actions')

    const lastColumnCells = wrapper.findAll('[data-slot="table-cell"]:last-child')
    expect(lastColumnCells).toHaveLength(mockData.length)

    lastColumnCells.forEach(td => {
      expect(td.find('button').exists()).toBe(true)
      expect(td.text()).toBe('Actions')
    })
 })
  
  it('não renderiza no-data quando há dados', () => {
  const wrapper = mount(BaseTable, {
    props: {
      headers: ['nome'],
      rows: mockData,
      rowKey: row => row.nome
    }
  })

  expect(wrapper.find('[data-slot="no-data"]').exists()).toBe(false)
  })
  
  it('renderiza slot cell-* quando fornecido', () => {
  const wrapper = mount(BaseTable, {
    props: {
      headers: ['nome', 'idade'],
      rows: mockData,
      rowKey: row => row.nome
    },
    slots: {
      'cell-nome': `<template #default="{ item }">
        <strong>{{ item }}</strong>
      </template>`
    }
  })

  const firstCell = wrapper.find('[data-slot="table-cell"]')
  expect(firstCell.find('strong').exists()).toBe(true)
  expect(firstCell.text()).toBe('João')
})
})