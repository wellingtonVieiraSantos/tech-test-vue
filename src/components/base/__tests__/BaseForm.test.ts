import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseForm from '../BaseForm.vue'

describe('BaseForm', () => {
  it('deve renderizar o componente corretamente', () => {
    const wrapper = mount(BaseForm)
    
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('deve emitir evento "submit" quando o formulário é submetido', async () => {
    const wrapper = mount(BaseForm)
    
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')).toHaveLength(1)
  })

  it('deve aceitar prop isUpdateMode com valor padrão false', () => {
    const wrapper = mount(BaseForm)
    
    expect(wrapper.props('isUpdateMode')).toBe(false)
  })

  it('deve aceitar prop isUpdateMode com valor true', () => {
    const wrapper = mount(BaseForm, {
      props: {
        isUpdateMode: true
      }
    })
    
    expect(wrapper.props('isUpdateMode')).toBe(true)
  })

  it('deve renderizar slot padrão', () => {
    const wrapper = mount(BaseForm, {
      slots: {
        content: '<input type="text" data-test="input" />'
      }
    })
    
    expect(wrapper.find('[data-test="input"]').exists()).toBe(true)
  })

  it('deve renderizar slot header', () => {
    const wrapper = mount(BaseForm, {
      slots: {
        header: '<h1 data-test="header">Título</h1>'
      }
    })
    
    expect(wrapper.find('[data-test="header"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="header"]').text()).toBe('Título')
  })

  it('deve renderizar slot footer', () => {
    const wrapper = mount(BaseForm, {
      slots: {
        footer: '<button data-test="button">Enviar</button>'
      }
    })
    
    expect(wrapper.find('[data-test="button"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="button"]').text()).toBe('Enviar')
  })

  it('deve renderizar todos os slots simultaneamente', () => {
    const wrapper = mount(BaseForm, {
      slots: {
        header: '<h1 data-test="header">Título</h1>',
        content: '<input type="text" data-test="input" />',
        footer: '<button data-test="button">Enviar</button>'
      }
    })
    
    expect(wrapper.find('[data-test="header"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="input"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="button"]').exists()).toBe(true)
  })
})
