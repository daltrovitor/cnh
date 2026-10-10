# CNH do Brasil — Carteira Digital de Trânsito

Aplicativo oficial digital para visualização e gerenciamento da Carteira Nacional de Habilitação (CNH) e do Certificado de Registro e Licenciamento de Veículo (CRLV-e).

## Recursos

- **Entrada com Biometria Facial**: Reconhecimento biométrico seguro via WebAuthn nativo do dispositivo móvel.
- **Visualização da Habilitação (CNH)**:
  - Frente oficial com foto, assinatura, dados do condutor e brasão da República Federativa do Brasil.
  - Verso oficial com categorias habilitadas (A, B, C, D, E, ACC) e observações (EAR).
  - QR Code Vio oficial do SERPRO/SENATRAN para validação de autenticidade em tempo real.
  - Histórico de emissões da CNH e exportação digital.
- **Visualização do Licenciamento (CRLV-e)**:
  - Documento do veículo completo com QR Code Vio, RENAVAM, Placa, Chassi e especificações técnicas.
  - Compartilhamento e exportação digital.
- **Perfil e Armazenamento no Celular**:
  - Edição de foto e dados exclusivamente no Perfil.
  - Persistência em camada dupla: `localStorage` e `IndexedDB` no próprio aparelho celular.
- **PWA & Service Worker**:
  - Suporte completo offline com Service Worker (`public/sw.js`).
  - Cache de telas e documentos para acesso sem conexão com a internet.

## Como Executar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.
