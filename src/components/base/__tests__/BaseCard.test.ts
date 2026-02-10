import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCard from '../BaseCard.vue'

describe('BaseCard', () => {

    it('deve renderizar o header', () => {
        const wrapper = mount(BaseCard, {
            slots: {
                header: 'Header'
            }
        })
        expect(wrapper.text()).toContain('Header')
    })
  
    it('deve renderizar o conteudo', () => {
        const wrapper = mount(BaseCard, {
            slots: {
                content: 'Content'
            }
        })
        expect(wrapper.text()).toContain('Content')
    })
  
    it('deve renderizar o footer', () => {
        const wrapper = mount(BaseCard, {
            slots: {
                footer: 'Footer'
            }
        })
        expect(wrapper.text()).toContain('Footer')
    })
  
    it('deve renderizar todos os slots', () => {
        const wrapper = mount(BaseCard, {
            slots: {
                header: 'Header',
                content: 'Content',
                footer: 'Footer'
            }
        })
        expect(wrapper.text()).toContain('Header')
        expect(wrapper.text()).toContain('Content')
        expect(wrapper.text()).toContain('Footer')
    })

})