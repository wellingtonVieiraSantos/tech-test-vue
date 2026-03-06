import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SpreedSheetMetrics from '../SpreedSheetMetrics.vue'
import BaseCard from '../../../base/BaseCard.vue'

describe('SpreedSheetMetrics - Teste de Integração', () => {
  const defaultProps = {
    totalProducts: 650,
    productsWithImage: 150,
    productsUnvailable: 25,
    productsOk: 475,
    averageScore: 0.85
  }

  it('deve renderizar todos os 4 cards de métricas', () => {
    const wrapper = mount(SpreedSheetMetrics, {
      props: defaultProps,
      global: {
        components: {
          BaseCard
        }
      }
    })

    const cards = wrapper.findAllComponents(BaseCard)
    expect(cards).toHaveLength(4)
  })

  it('deve exibir corretamente o número de produtos com imagem', () => {
    const wrapper = mount(SpreedSheetMetrics, {
      props: defaultProps,
      global: {
        components: {
          BaseCard
        }
      }
    })

    const text = wrapper.text()
    expect(text).toContain('Produtos com imagem')
    expect(text).toContain('150')
  })

  it('deve exibir corretamente o número de produtos indisponíveis', () => {
    const wrapper = mount(SpreedSheetMetrics, {
      props: defaultProps,
      global: {
        components: {
          BaseCard
        }
      }
    })

    const text = wrapper.text()
    expect(text).toContain('Produtos indisponíveis')
    expect(text).toContain('25')
  })

  it('deve exibir corretamente o número de produtos disponíveis', () => {
    const wrapper = mount(SpreedSheetMetrics, {
      props: defaultProps,
      global: {
        components: {
          BaseCard
        }
      }
    })

    const text = wrapper.text()
    expect(text).toContain('Produtos disponíveis')
    expect(text).toContain('475')
  })

  it('deve calcular e exibir a média de score em percentual', () => {
    const wrapper = mount(SpreedSheetMetrics, {
      props: defaultProps,
      global: {
        components: {
          BaseCard
        }
      }
    })

    const text = wrapper.text()
    expect(text).toContain('Média de score')
    expect(text).toContain('85.00%')
  })

  it('deve formatar corretamente a média de score com 2 casas decimais', () => {
    const wrapper = mount(SpreedSheetMetrics, {
      props: {
        ...defaultProps,
        averageScore: 0.7534
      },
      global: {
        components: {
          BaseCard
        }
      }
    })

    expect(wrapper.text()).toContain('75.34%')
  })

  it('deve atualizar os valores quando as props mudarem', async () => {
    const wrapper = mount(SpreedSheetMetrics, {
      props: defaultProps,
      global: {
        components: {
          BaseCard
        }
      }
    })

    expect(wrapper.text()).toContain('150')
    
    await wrapper.setProps({
      productsWithImage: 200
    })

    expect(wrapper.text()).toContain('200')
  })

  it('deve exibir 0% quando averageScore for 0', () => {
    const wrapper = mount(SpreedSheetMetrics, {
      props: {
        ...defaultProps,
        averageScore: 0
      },
      global: {
        components: {
          BaseCard
        }
      }
    })

    expect(wrapper.text()).toContain('0.00%')
  })

  it('deve exibir 100% quando averageScore for 1', () => {
    const wrapper = mount(SpreedSheetMetrics, {
      props: {
        ...defaultProps,
        averageScore: 1
      },
      global: {
        components: {
          BaseCard
        }
      }
    })

    expect(wrapper.text()).toContain('100.00%')
  })

  it('deve ter a estrutura HTML correta com classes CSS', () => {
    const wrapper = mount(SpreedSheetMetrics, {
      props: defaultProps,
      global: {
        components: {
          BaseCard
        }
      }
    })

    const container = wrapper.find('div')
    expect(container.classes()).toContain('flex')
    expect(container.classes()).toContain('gap-4')
    expect(container.classes()).toContain('w-full')
  })
})
