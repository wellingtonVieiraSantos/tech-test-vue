import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseModal from '../BaseModal.vue'

describe('BaseModal', () => {
  it('deve renderizar o conteúdo corretamente', () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
      },
      slots: {
        content: 'Modal content'
      }
    })
    
    expect(wrapper.find('[data-slot="modal-content"]').text()).toContain('Modal content')
  })

  it('não deve renderizar quando isOpen=false', () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: false,
      }
    })
    
    expect(wrapper.find('[data-slot="modal"]').exists()).toBe(false)
  })



  it('deve fechar quando a tecla Escape é pressionada', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
      }
    })
    
    await window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape' })
    )

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('deve fechar quando o overlay é clicado', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
      }
    })
    
    await wrapper.find('[data-slot="modal-overlay"]').trigger('click')
    
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('não deve fechar quando o conteúdo do modal é clicado', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
      },
      slots: {
        content: 'Modal content'
      }
    })
    
    await wrapper.find('[data-slot="modal-content"]').trigger('click')
    
    expect(wrapper.emitted('close')).toBeUndefined()
  })

  it('deve ter um aria-label personalizado para o modal', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
        modalAriaLabel: 'Custom Modal Dialog'
      }
    })
    
    expect(wrapper.find('[data-slot="modal"]').attributes('aria-label')).toBe('Custom Modal Dialog')
  })

  it('deve ter um aria-labelledby personalizado', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
        modalAriaLabelledby: 'custom-title'
      }
    })
    
    expect(wrapper.find('[data-slot="modal"]').attributes('aria-labelledby')).toBe('custom-title')
  })

  it('deve ter um aria-describedby personalizado', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
        modalAriaDescribedby: 'custom-description'
      }
    })
    
    expect(wrapper.find('[data-slot="modal"]').attributes('aria-describedby')).toBe('custom-description')
  })

  it('deve ter um aria-modal definido como true', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
      }
    })
    
    expect(wrapper.find('[data-slot="modal"]').attributes('aria-modal')).toBe('true')
  })

  it('deve ter um role="dialog"', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
      }
    })
    
    expect(wrapper.find('[data-slot="modal"]').attributes('role')).toBe('dialog')
  })
})