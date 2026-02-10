# Vue 3 + TypeScript + Vite

Este projeto foi desenvolvido visando um teste prático para a vaga de desenvolvedor(a) frontend e foi usado a stack: Vue 3, TypeScript e Vite.

## 🚀 Como Executar

### Instalação

```bash
# Instalar as dependências do projeto
pnpm install
```

### Desenvolvimento

```bash
# Iniciar o servidor de desenvolvimento local
pnpm dev
```

### Build

```bash
# Gerar a versão de produção
pnpm build
```

## 🧪 Testes

Este projeto está configurado com [Vitest](https://vitest.dev/) para testes unitários e de integração.

### Comandos Disponíveis

```bash
# Executar testes em modo watch (reexecuta ao salvar)
pnpm test

# Executar testes uma única vez
pnpm test:run

# Executar testes com interface visual
pnpm test:ui

# Executar testes com relatório de cobertura
pnpm test:coverage
```

### Estrutura de Testes

Os testes estão organizados próximos ao código fonte:

```
src/
├── lib/
│   ├── idGenerator.ts
│   └── __tests__/
│       └── idGenerator.test.ts
├── components/
│   ├── base/
│   │   ├── BaseForm.vue
│   │   └── __tests__/
│   │       └── BaseForm.test.ts
│   └── features/
│       └── SpreedSheet/
│           ├── SpreedSheetMetrics.vue
│           └── __tests__/
│               └── SpreedSheetMetrics.test.ts
└── test/
    └── setup.ts  # Configuração global dos testes
```

### Escrevendo Testes

#### Teste Unitário de Função

```typescript
import { describe, it, expect } from 'vitest'
import { minhaFuncao } from '../minhaFuncao'

describe('minhaFuncao', () => {
  it('deve retornar o valor esperado', () => {
    expect(minhaFuncao(1, 2)).toBe(3)
  })
})
```

#### Teste de Componente Vue

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MeuComponente from '../MeuComponente.vue'

describe('MeuComponente', () => {
  it('deve renderizar corretamente', () => {
    const wrapper = mount(MeuComponente, {
      props: { titulo: 'Teste' }
    })
    expect(wrapper.text()).toContain('Teste')
  })
})
```

### Cobertura de Código

Após executar `pnpm test:coverage`, abra o arquivo `coverage/index.html` no navegador para visualizar o relatório detalhado de cobertura.
