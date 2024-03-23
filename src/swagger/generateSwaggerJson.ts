import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import { swaggerSpec } from './swaggerConfig';  

fs.writeFile(path.join(__dirname, 'swagger.json'), JSON.stringify(swaggerSpec, null, 2), (err: any) => {
  if (err) {
    console.error('Erro ao gerar o arquivo swagger.json:', err);
  } else {
    console.log('Arquivo swagger.json gerado com sucesso!');
  }
});

fs.writeFile(path.join(__dirname, 'swagger.yaml'), yaml.dump(swaggerSpec), (err: any) => {
  if (err) {
    console.error('Erro ao gerar o arquivo swagger.yaml:', err);
  } else {
    console.log('Arquivo swagger.yaml gerado com sucesso!');
  }
});
