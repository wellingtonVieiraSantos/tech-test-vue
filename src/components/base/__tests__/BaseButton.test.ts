import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '../BaseButton.vue'

describe('BaseButton', () => {

  it('deve emitir o evento click quando clicado', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'default'
      }
    })
    
    await wrapper.trigger('click')
    
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')!.length).toBe(1)
  })

  it('deve renderizar o conteúdo corretamente', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'default'
      },
      slots: {
        default: 'Test Button'
      }
    })
    
    expect(wrapper.text()).toContain('Test Button')
  })



  it('deve aplicar a classe default por padrão', () => {
    const wrapper = mount(BaseButton, {
       props: {
         variant: 'default'
       }
    })
    
    expect(wrapper.classes()).toContain('bg-blue-500')
  })

  it('deve aplicar a classe danger quando variant="danger"', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'danger'
      }
    })
    
    expect(wrapper.classes()).toContain('bg-red-700')
    expect(wrapper.classes()).not.toContain('bg-blue-500')
  })

  it('deve aplicar a classe disabled quando disabled=true', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'default',
        disabled: true
      }
    })
    
    expect(wrapper.classes()).toContain('disabled:bg-gray-400')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('deve ter o tipo button por padrão', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'default',
        type: 'button'
      }
    })
    
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('deve suportar diferentes tipos de botão', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'default',
        type: 'submit'
      }
    })
    
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('deve ter um cursor pointer quando não desabilitado', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'default'
      }
    })
    
    expect(wrapper.classes()).toContain('cursor-pointer')
  })

  it('deve ter um cursor not-allowed quando desabilitado', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'default',
        disabled: true
      }
    })
    
    expect(wrapper.classes()).toContain('cursor-not-allowed')
  })

  it('deve ter um aria-label quando variant="default"', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'default'
      }
    })
    
    expect(wrapper.attributes('aria-label')).toBe('Botão padrão')
  })
  it('deve ter um aria-disabled quando disabled=true', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'default',
        disabled: true
      }
    })
    
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })
})